import { IDisposable, KeyValuePair } from "@dotup/dotup-ts-types";
import { MqttClient, Packet, IClientSubscribeOptions } from "mqtt";
import { MessageCallback } from "../types";
import { IPublisher } from "./IPublisher";
import { MqttTopicMatch } from "./MqttTopicMatch";
import { MqttConnectionOptions } from "./MqttConnectionOptions";
import { IMqttMessage } from "./IMqttMessage";
import { connectAsync } from "./AsyncClient";
import { getNamedLogger } from "../MqttLogging";

const logger = getNamedLogger("MqttConnection");

export declare type MqttSubscriber = KeyValuePair<string, ((topic: string, message: string) => void)[]>;

export class MqttConnection implements IPublisher, IDisposable {

  private client: MqttClient;
  readonly subscriber: MqttSubscriber[];
  private onConnected: ((client: MqttClient) => void) | undefined;

  constructor(onConnected?: (client: MqttClient) => void) {
    this.subscriber = [];
    this.onConnected = onConnected;
  }

  isConnected(): boolean {
    if (this.client === undefined) {
      return false;
    }

    return this.client.connected;
  }

  async connect(options: Partial<MqttConnectionOptions>): Promise<void> {

    const connectionInfo = `hostname: ${options.host} | port: ${options.port} | protocol: ${options.protocol}`;

    logger.info(`Connecting to '${connectionInfo}'`);

    this.client = await connectAsync(options);

    logger.info("Register MQTT 'offline' event");
    this.client.on("offline", () => {
      logger.info(`Disconnected | ${connectionInfo}`);
    });

    logger.info("Register MQTT 'error' event");
    this.client.on("error", (err) => {
      logger.error(err);
    });

    logger.info("Register MQTT 'reconnect' event");
    this.client.on("reconnect", () => {
      logger.info(`Reconnecting | ${connectionInfo}`);
    });

    logger.info("Register MQTT 'connect' event");
    this.client.on("connect", () => {
      logger.info(`Connected | ${connectionInfo}`);
      if (this.onConnected)
        this.onConnected(this.client);
    });

    logger.info("Register MQTT 'message' event");
    this.client.on("message", (topic: string, payload: Buffer, packet: Packet) => {
      try {
        const topicSubscription = this.subscriber.filter(x => MqttTopicMatch.matches(topic, x.key));
        const message = payload.toString();

        for (const subscriber of topicSubscription) {
          subscriber.value.forEach(callback => {
            callback(topic, message);
          });
        }
      } catch (error) {
        // tslint:disable-next-line: no-unsafe-any
        logger.error(error);
      }
    });

  }

  publish<T>(message: IMqttMessage<T>): void {
    // if (this.client === undefined) {
    //   return;
    // }
    const m = JSON.stringify(message.message);
    this.client.publish(message.topic, m, { qos: message.QoS, retain: message.retain }, err => {
      if (err) {
        logger.error(err);
      }
    });
  }

  async publishAsync<T>(message: IMqttMessage<T>): Promise<void> {
    const m = JSON.stringify(message.message);
    return new Promise((resolve, reject) => {
      this.client.publish(message.topic, m, { qos: message.QoS, retain: message.retain }, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // public subscribe(topic: string | string[], opts: IClientSubscribeOptions, callback?: ClientSubscribeCallback): this;
  // public subscribe(topic: string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): this;
  subscribe(topic: string, callback: MessageCallback): void;
  subscribe(topic: string, options: IClientSubscribeOptions, callback: MessageCallback): void;
  subscribe(topic: string, optsOrCallback: IClientSubscribeOptions | MessageCallback, callback?: MessageCallback): void {
    const cb = callback ? callback : optsOrCallback as MessageCallback;
    const opts = callback ? optsOrCallback as IClientSubscribeOptions : undefined;

    const entry = this.subscriber.find(x => x.key === topic);
    if (entry === undefined) {
      this.subscriber.push({ key: topic, value: [cb] });
    } else {
      entry.value.push(cb);
    }

    if (opts) {
      this.client.subscribe(topic, opts, err => {
        if (err !== null) {
          logger.error(err);
          this.unsubscribe(topic, cb);
        }
      });
    } else {
      this.client.subscribe(topic, err => {
        if (err !== null) {
          logger.error(err);
          this.unsubscribe(topic, cb);
        }
      });
    }
  }

  unsubscribe(topic: string, callback: MessageCallback): void {
    const topicSubscriber = this.subscriber.find(x => x.key === topic);
    if (topicSubscriber === undefined) {
      logger.warn(`Could not unsubscribe. Topic '${topic}' not found.`);
      return;
    }
    const topicCallback = topicSubscriber.value.findIndex(x => x === callback);
    if (topicCallback < 0) {
      logger.warn(`Could not unsubscribe topic '${topic}'. Callback not found.`);
      return;
    }
    topicSubscriber.value = topicSubscriber.value.splice(topicCallback, 1);

    if (topicSubscriber.value.length < 1) {
      this.client.unsubscribe(topic);
    }
  }

  async dispose(): Promise<void> {
    // this.client.end()
    this.onConnected = undefined;
    if (this.client === undefined) {
      return;
    }

    const end = new Promise((resolve, reject) => {
      this.client.end(false, () => {
        resolve();
      });
    });
    await end;
    this.client.removeAllListeners();
    delete this.client;
  }

}
