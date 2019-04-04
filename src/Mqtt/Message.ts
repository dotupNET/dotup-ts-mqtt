import { v1 } from 'node-uuid';
import { IMessage } from './IMessage';
import { QosType } from './QosType';

export class Message<T> implements IMessage<T> {
  messageId: string;
  QoS: QosType = QosType.AtLeastOnce;
  retain: boolean = false;

  topic: string;
  data: T;

  constructor() {
    this.messageId = v1();
    // tslint:disable-next-line: no-object-literal-type-assertion
    this.data = <T>{};
  }
}
