export class MqttConnectionOptions {
  host: string;
  clientId: string;
  port?: number = 1883;
  protocol?: "wss" | "ws" | "mqtt" | "mqtts" | "tcp" | "ssl" | "wx" | "wxs" = "ws";
  connectTimeoutMs?: number = 5000;
  keepaliveSec?: number = 10;
  reconnectPeriodMs?: number = 5000;
  clean?: boolean = false;
  resubscribe?: boolean = true;
  username?: string;
  password?: string;

}
