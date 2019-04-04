import { ConsoleLogWriter, LoggerManager, LogLevel } from 'dotup-ts-logger';
import { MqttConnection } from './Mqtt/MqttConnection';
import { QosType } from './Mqtt/QosType';
import { getHostname } from './tools';

export class Sample {

  private mqtt: MqttConnection;

  async run(): Promise<void> {

    // Initialize logger
    const conso = new ConsoleLogWriter();
    // tslint:disable-next-line: no-bitwise
    conso.LogLevel = LogLevel.Debug |
      LogLevel.Info |
      LogLevel.Warn |
      LogLevel.Error |
      LogLevel.Fatal;

    const lm = new LoggerManager();
    lm.AttachLogWriter(conso);

    this.mqtt = new MqttConnection(getHostname());
    this.mqtt.connect('dotup-pi003');

    this.mqtt.subscribe('test', (topic, message) => {
      console.log(`topic: ${topic}| message: ${message}`);
    });

    this.mqtt.publish({
      topic: 'test',
      data: 'Some payload',
      QoS: QosType.AtMostOnce,
      messageId: '1',
      retain: false
    });

  }

}

const sample = new Sample();
sample
  .run()
  .catch(err => console.log(err));
