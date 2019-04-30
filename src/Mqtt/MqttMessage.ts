import { v1 } from 'node-uuid';
import { IMessage } from './IMessage';
import { QosType } from './QosType';
import { IMqttMessage } from './IMqttMessage';

export class MqttMessage<T> implements IMqttMessage<T> {
  QoS: QosType = QosType.AtLeastOnce;
  retain: boolean = false;

  topic: string;
  message: T;

  constructor() {
    // this.messageId = v1();
    // tslint:disable-next-line: no-object-literal-type-assertion
    this.message = <T>{};
  }
}
