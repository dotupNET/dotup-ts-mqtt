import { MqttConnection } from "./MqttConnection";
import { IMessage } from "./IMessage";
import { getLogger } from "log4js";
import { IMqttMessage } from "./IMqttMessage";
import { TransferState } from "./TransferState";
import { getNamedLogger } from "../MqttLogging";

const logger = getNamedLogger("MqttConnection");

export class MqttSendQueue {
  private readonly mqtt: MqttConnection;
  private queue: IMqttMessage<IMessage>[] = [];
  private timer: NodeJS.Timeout | undefined;
  private interval: number;
  readonly resendMessageAfterMs: number;

  constructor(mqtt: MqttConnection, sendInterval: number = 500, resendMessageAfterMs?: number) {
    logger.info("Creating MqttSendQueue");
    this.interval = sendInterval;
    this.mqtt = mqtt;

    if (resendMessageAfterMs && (resendMessageAfterMs > 500 && resendMessageAfterMs < 20000)) {
      this.resendMessageAfterMs = resendMessageAfterMs;
    } else {
      this.resendMessageAfterMs = 5000;
    }
  }

  getSendQueueSize(): number {
    return this.queue.length;
  }

  start(): void {
    if (this.timer !== undefined) {
      return;
    }

    this.resendMessages(0);
    this.sendMessages();

    this.timer = setInterval(() => {
      this.sendMessages();
      this.resendMessages(this.resendMessageAfterMs);
    }, this.interval);

    logger.info("MqttSendQueue started");
  }

  resendMessages(messageAgeInMs: number = 5000): void {
    const now = new Date(new Date().toUTCString());

    this.queue.forEach(item => {
      const diff = now.getTime() - item.transferTimestamp.getTime();
      if (diff > messageAgeInMs) {
        item.transferState = TransferState.New;
      }
    });
  }

  private sendMessages(): void {
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

  add<T extends IMessage>(item: IMqttMessage<T>): void {
    this.queue.push(item);
  }

  remove(ids: string[]): void {
    this.queue = this.queue.filter(item => ids.every(id => item.message!.id !== id));
  }

}
