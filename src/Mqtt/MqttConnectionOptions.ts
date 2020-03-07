export class MqttConnectionOptions {
  host: string;
  clientId: string;
  port?: number = 1883;
  protocol?: "wss" | "ws" | "mqtt" | "mqtts" | "tcp" | "ssl" | "wx" | "wxs" = "ws";
  /**
   * millisecodns
   */
  connectTimeout?: number = 5000;
  /**
   * seconds
   */
  keepalive?: number = 10;
  /**
   * milliseconds
   */
  reconnectPeriod?: number = 5000;
  clean?: boolean = false;
  resubscribe?: boolean = true;
  username?: string;
  password?: string;

}
