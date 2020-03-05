import { connect, MqttClient, Packet, IClientPublishOptions, PacketCallback } from 'mqtt';
import { MqttConnectionOptions } from './MqttConnectionOptions';
import { getLogger } from 'log4js';

const logger = getLogger("MqttConnection");

export const connectAsync = async (options: Partial<MqttConnectionOptions>): Promise<MqttClient> => {
  const client = connect(undefined,
    {
      host: options.hostname,
      hostname: options.hostname,
      port: options.port,
      protocol: options.protocol,
      clientId: options.clientId,
      connectTimeout: options.connectTimeoutMs,
      keepalive: options.keepaliveSec,
      reconnectPeriod: options.reconnectPeriodMs,
      clean: options.clean,
      resubscribe: options.resubscribe,
      username: options.username,
      password: options.password
    }
  );

  return new Promise((resolve, reject) => {
    // Listeners added to client to trigger promise resolution
    const promiseListeners: any = {
      connect: () => {
        logger.info("Promise connect");
        removePromiseResolutionListeners();
        resolve(client);   // Resolve on connect
      },
      end: () => {
        logger.info("Promise end");
        removePromiseResolutionListeners();
        resolve(client);   // Resolve on end
      },
      error: (err: Error) => {
        logger.info(`Promise error: ${err}`);
        removePromiseResolutionListeners();
        client.end();
        reject(err);  // Reject on error
      }
    };

    // Remove listeners added to client by this promise
    const removePromiseResolutionListeners = () => {
      logger.info("Remove promise resolve/reject events");
      for (const eventName of Object.keys(promiseListeners)) {
        logger.info(`Remove promise event: ${eventName}`);
        client.removeListener(eventName, promiseListeners[eventName]);
      }
    };

    // Add listeners to client
    logger.info("Register promise resolve/reject events");
    for (const eventName of Object.keys(promiseListeners)) {
      logger.info(`Register promise event: ${eventName}`);
      client.on(eventName, promiseListeners[eventName]);
    }
  });

};
