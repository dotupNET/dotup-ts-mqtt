/*
 * File generated by Interface generator (dotup.dotup-vscode-interface-generator)
 * Date: 2019-04-01 21:52:39
*/
import { QosType } from './QosType';

export interface IMessage<T> {
  messageId: string;
  QoS: QosType;
  retain: boolean;
  topic: string;
  data: T;
  // getData<T>(): T;
}
