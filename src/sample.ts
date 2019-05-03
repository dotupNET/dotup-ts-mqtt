import { MqttConnection } from './Mqtt/MqttConnection';
import { QosType } from './Mqtt/QosType';
import { getHostname } from './tools';

export class Sample {

  private mqtt: MqttConnection;

  async run(): Promise<void> {

    // Initialize logger
    this.mqtt = new MqttConnection();
    this.mqtt.connect({
      hostname: 'dotup-vpi1101',
      protocol: 'ws',
      port: 1883,
      clientId: `dotup-ts-mqtt-${getHostname()}`
    });

    this.mqtt.subscribe('#', (topic, message) => {
      console.log(`topic: ${topic}| message: ${message}`);
    });

    this.mqtt.publish<string>({
      topic: 'test',
      message: 'Some payload',
      // messageId: '1',
      QoS: QosType.AtMostOnce,
      retain: false
    });

  }

}

const sample = new Sample();
sample
  .run()
  .catch(err => console.log(err));
