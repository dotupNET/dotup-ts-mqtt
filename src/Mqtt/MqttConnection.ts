import { LoggerFactory } from 'dotup-ts-logger';
import { IDisposable, KeyValuePair } from 'dotup-ts-types';
import { connect, MqttClient, Packet } from 'mqtt';
import { MessageCallback } from '../types';
import { IMessage } from './IMessage';
import { IPublisher } from './IPublisher';
import { MqttTopicMatch } from './MqttTopicMatch';

const logger = LoggerFactory.createLogger('MqttConnection');

export class MqttConnection implements IPublisher, IDisposable {

  private client: MqttClient;
  readonly clientId: string;
  readonly subscriber: KeyValuePair<string, ((topic: string, message: string) => void)[]>[];

  constructor(deviceId: string) {
    this.clientId = `MotoBox-${deviceId}`;
    this.subscriber = [];
    logger.Info(`Creating MqttConnection as '${this.clientId}'`, 'ctor');
  }

  isConnected(): boolean {
    if (this.client === undefined) {
      return false;
    }

    return this.client.connected;
  }

  connect(host: string): void {
    this.client = connect(undefined, {
      host: host,
      hostname: host,
      port: 1883,
      protocol: 'ws',
      clientId: this.clientId,
      connectTimeout: 5000,
      keepalive: 10,
      reconnectPeriod: 5000
    });

    // tslint:disable-next-line: max-line-length
    const connectionInfo = `hostname: ${this.client.options.hostname} | port: ${this.client.options.port} | protocol: ${this.client.options.protocol}`;

    this.client.on('offline', () => {
      logger.Info(`Disconnected | ${connectionInfo}`);
    });

    this.client.on('error', (err) => {
      logger.Error(err);
    });

    this.client.on('reconnect', () => {
      logger.Info(`Reconnecting | ${connectionInfo}`);
    });

    this.client.on('connect', () => {
      logger.Info(`Connected | ${connectionInfo}`);
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
        logger.Error(error);
      }
    });

  }

  publish<T>(message: IMessage<T>): void {
    // if (this.client === undefined) {
    //   return;
    // }
    const m = JSON.stringify(message);
    this.client.publish(message.topic, m, { qos: message.QoS, retain: message.retain }, err => {
      if (err !== undefined) {
        logger.Error(err);
      }
    });
  }

  // public subscribe(topic: string | string[], opts: IClientSubscribeOptions, callback?: ClientSubscribeCallback): this;
  // public subscribe(topic: string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): this;
  subscribe(topic: string, callback: MessageCallback): void {
    this.client.subscribe(topic, undefined, err => {
      if (err !== null) {
        logger.Error(err);
      }
      const entry = this.subscriber.find(x => x.key === topic);
      if (entry === undefined) {
        this.subscriber.push({ key: topic, value: [callback] });
      } else {
        entry.value.push(callback);
      }
    });
  }

  async dispose(): Promise<void> {
    // this.client.end()
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
