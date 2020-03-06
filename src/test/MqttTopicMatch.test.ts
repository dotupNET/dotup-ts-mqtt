
import { MqttTopicMatch } from "../Mqtt/MqttTopicMatch";
import { expect } from "chai";

describe("AwesomeLibrary", () => {

  it("should be false", () => {

    let topic = "request/device1/racegroup";

    let filter = "request/+/lamptest";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;

    filter = "request/device/racegroup";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;

    filter = "request";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;    

    topic = "request/racegroup";

    filter = "request/+/lamptest";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;    

    filter = "request/+/racegroup";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;    

    filter = "request";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.false;    

  });

  it("should be true", () => {
    let topic = "request/device1/racegroup";
    
    let filter = "request/+/racegroup";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;

    filter = "request/device1/racegroup";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;

    filter = "request/#";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;    

    filter = "#";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;    

    topic = "request/racegroup";
    filter = "request/racegroup";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;    

    filter = "request/#";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;    

    filter = "#";
    expect(MqttTopicMatch.matches(topic, filter)).to.be.true;    

  });

});
