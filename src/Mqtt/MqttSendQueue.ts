import { MqttConnection } from './MqttConnection';
import { IMessage } from './IMessage';
import { getLogger } from 'log4js';
import { IMqttMessage } from './IMqttMessage';

const logger = getLogger('MqttConnection');

export class MqttSendQueue {
  private readonly mqtt: MqttConnection;
  private queue: IMqttMessage<any>[] = [];
  private timer: NodeJS.Timeout;
  private interval: number;

  constructor(mqtt: MqttConnection, sendInterval: number = 500) {
    logger.info('Creating MqttSendQueue');
    this.interval = sendInterval;
    this.mqtt = mqtt;
  }

  start(): void {
    if (this.timer !== undefined) {
      return;
    }

    logger.info('MqttSendQueue started');

    this.timer = setInterval(() => {
      const copy = this.queue.slice();
      copy.forEach(x => {
        try {
          if (this.mqtt.isConnected) {
            this.mqtt.publish<any>(x);
            const index = this.queue.indexOf(x);
            this.queue.splice(index, 1);
          }
        } catch (error) {
          logger.error(error);
        }
      });

    }, this.interval);
  }

  stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      logger.info('MqttSendQueue stopped');
    }
  }

  add<T>(item: IMqttMessage<T>) {
    this.queue.push(item);
  }

}
