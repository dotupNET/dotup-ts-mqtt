import { IDisposable, KeyValuePair } from 'dotup-ts-types';
import { connect, MqttClient, Packet } from 'mqtt';
import { MessageCallback } from '../types';
import { IMessage } from './IMessage';
import { IPublisher } from './IPublisher';
import { MqttTopicMatch } from './MqttTopicMatch';
import { getLogger } from 'log4js';
import { MqttConnectionOptions } from './MqttConnectionOptions';

const logger = getLogger('MqttConnection');

export class MqttConnection implements IPublisher, IDisposable {

  private client: MqttClient;
  readonly subscriber: KeyValuePair<string, ((topic: string, message: string) => void)[]>[];

  constructor() {
    this.subscriber = [];
  }

  isConnected(): boolean {
    if (this.client === undefined) {
      return false;
    }

    return this.client.connected;
  }

  connect(options: MqttConnectionOptions): void {

    const connectionInfo = `hostname: ${options.hostname} | port: ${options.port} | protocol: ${options.protocol}`;

    logger.info(`Connecting to '${connectionInfo}'`);

    this.client = connect(undefined, {
      host: options.hostname,
      hostname: options.hostname,
      port: options.port,
      protocol: options.protocol,
      clientId: options.clientId,
      connectTimeout: options.connectTimeoutMs,
      keepalive: options.keepaliveSec,
      reconnectPeriod: options.reconnectPeriodMs
    });

    // tslint:disable-next-line: max-line-length

    this.client.on('offline', () => {
      logger.info(`Disconnected | ${connectionInfo}`);
    });

    this.client.on('error', (err) => {
      logger.error(err);
    });

    this.client.on('reconnect', () => {
      logger.info(`Reconnecting | ${connectionInfo}`);
    });

    this.client.on('connect', () => {
      logger.info(`Connected | ${connectionInfo}`);
    });

    this.client.on('message', (topic: string, payload: Buffer, packet: Packet) => {
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

  publish<T>(message: IMessage<T>): void {
    // if (this.client === undefined) {
    //   return;
    // }
    const m = JSON.stringify(message);
    this.client.publish(message.topic, m, { qos: message.QoS, retain: message.retain }, err => {
      if (err) {
        logger.error(err);
      }
    });
  }

  // public subscribe(topic: string | string[], opts: IClientSubscribeOptions, callback?: ClientSubscribeCallback): this;
  // public subscribe(topic: string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): this;
  subscribe(topic: string, callback: MessageCallback): void {
    this.client.subscribe(topic, undefined, err => {
      if (err !== null) {
        logger.error(err);
      }
      const entry = this.subscriber.find(x => x.key === topic);
      if (entry === undefined) {
        this.subscriber.push({ key: topic, value: [callback] });
      } else {
        entry.value.push(callback);
      }
    });
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
    this.client = undefined;
  }

}
