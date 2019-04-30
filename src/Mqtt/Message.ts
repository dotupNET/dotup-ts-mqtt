import { v1 } from 'node-uuid';
import { IMessage } from './IMessage';
import { QosType } from './QosType';

export abstract class Message<T> implements IMessage {
  messageId: string;
  timestamp: string;

  constructor() {
    this.messageId = v1();
    this.timestamp = new Date().toISOString();
    // tslint:disable-next-line: no-object-literal-type-assertion
  }
}
