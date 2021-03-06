import { QosType } from "./QosType";
import { IMqttMessage } from "./IMqttMessage";
import { TransferState } from "./TransferState";

export class MqttMessage<T> implements IMqttMessage<T> {
  transferState: TransferState;
  QoS: QosType = QosType.AtLeastOnce;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  retain: boolean = false;
  topic: string;
  message: T;
  transferTimestamp: Date;

  constructor() {
    // this.messageId = v1();
    // tslint:disable-next-line: no-object-literal-type-assertion
    this.message = {} as T;
    this.transferState = TransferState.New;
  }
}
