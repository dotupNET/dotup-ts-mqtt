import { MqttConnection } from "./MqttConnection";
import { IMessage } from "./IMessage";
import { getLogger } from "log4js";
import { IMqttMessage } from "./IMqttMessage";
import { TransferState } from "./TransferState";
import { getNamedLogger } from "../MqttLogging";

const logger = getNamedLogger("MqttConnection");

export class MqttSendQueue {
  private readonly mqtt: MqttConnection;
  private queue: IMqttMessage<unknown>[] = [];
  private timer: NodeJS.Timeout | undefined;
  private interval: number;

  constructor(mqtt: MqttConnection, sendInterval: number = 500) {
    logger.info("Creating MqttSendQueue");
    this.interval = sendInterval;
    this.mqtt = mqtt;
  }

  getSendQueueSize(): number {
    return this.queue.length;
  }

  start(): void {
    if (this.timer !== undefined) {
      return;
    }

    this.timer = setInterval(() => {
      this.sendMessages();
      this.resendMessages();
    }, this.interval);

    logger.info("MqttSendQueue started");
  }

  private resendMessages() {
    const now = new Date(new Date().toUTCString());

    this.queue.forEach(item => {
      const diff = now.getTime() - item.transferTimestamp.getTime();
      if (diff > 5000) {
        item.transferState = TransferState.New;
      }
    });
  }

  private sendMessages() {
    const copy = this.queue.filter(item => item.transferState === TransferState.New);
    copy.forEach(x => {
      try {
        if (this.mqtt.isConnected()) {
          this.mqtt.publish<any>(x);
          // const index = this.queue.indexOf(x);
          x.transferState = TransferState.Transfered;
          x.transferTimestamp = new Date(new Date().toUTCString());
          // this.queue.splice(index, 1);
        }
      } catch (error) {
        logger.error(error);
      }
    });
  }

  stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
      logger.info("MqttSendQueue stopped");
    }
  }

  add<T>(item: IMqttMessage<T>) {
    this.queue.push(item);
  }

  remove(ids: string[]) {
    const index = ids.map(id => this.queue.findIndex(item => (item.message as IMessage).id === id));

    index.forEach(i => {
      if (i > -1) {
        this.queue.splice(i, 1);
      }
    });

  }

}
