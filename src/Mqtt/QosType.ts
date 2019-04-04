// tslint:disable: max-line-length

export enum QosType {
  // QoS 0 : received at most once : The packet is sent, and that's it. There is no validation about whether it has been received.
  AtMostOnce = 0,
  // QoS 1 : received at least once : The packet is sent and stored as long as the client has not received a confirmation from the server.MQTT ensures that it will be received, but there can be duplicates.
  AtLeastOnce = 1,
  // QoS 2 : received exactly once : Same as QoS 1 but there is no duplicates.
  ExactlyOnce = 2
}
