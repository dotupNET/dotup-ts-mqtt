import { MqttConnection } from "./Mqtt/MqttConnection";
import { QosType } from "./Mqtt/QosType";
import { getHostname } from "./tools";
import { TransferState } from "./Mqtt/TransferState";

export class Sample {

  private mqtt: MqttConnection;

  async run(): Promise<void> {



    // Initialize logger
    this.mqtt = new MqttConnection();
    await this.mqtt.connect({
      host: "localhost",
      protocol: "ws",
      port: 1883,
      clientId: `dotup-ts-mqtt-${getHostname()}`
    });

    this.mqtt.subscribe("request/#", (topic, message) => {
      console.log(`topic: ${topic}| message: ${message}`);
    });

    this.mqtt.publish<string>({
      topic: "test",
      message: "Some payload",
      // messageId: '1',
      QoS: QosType.AtMostOnce,
      retain: false,
      transferState: TransferState.New,
      transferTimestamp: new Date(new Date().toUTCString())
    });

  }

}

const sample = new Sample();
sample
  .run()
  .catch(err => console.log(err));
