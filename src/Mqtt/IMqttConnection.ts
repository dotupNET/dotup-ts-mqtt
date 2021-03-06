/*
 * File generated by Interface generator (dotup.dotup-vscode-interface-generator)
 * Date: 2019-04-04 03:32:08
*/
import { IDisposable } from "@dotup/dotup-ts-types";
import { MessageCallback } from "../types";
import { IMqttMessage } from "./IMqttMessage";

export interface IMqttConnection extends IDisposable {
  readonly clientId: string;
  readonly subscriber: {};
  isConnected(): boolean;
  connect(host: string): void;
  publish<T>(message: IMqttMessage<T>): void;
  subscribe(topic: string, callback: MessageCallback): void;
}
