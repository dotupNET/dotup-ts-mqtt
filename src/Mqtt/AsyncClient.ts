/* eslint-disable @typescript-eslint/no-use-before-define */
import { connect, MqttClient, IClientOptions } from "mqtt";
import { getNamedLogger } from "../MqttLogging";

const logger = getNamedLogger("MqttConnection");

export const connectAsync = async (options: Partial<IClientOptions>): Promise<MqttClient> => {
  const client = connect(undefined,
    {
      hostname: `${options.host}`,
      protocol: options.protocol,
      host: options.host,
      port: options.port,
      clientId: options.clientId,
      clean: options.clean
    });

  return new Promise((resolve, reject) => {
    // Listeners added to client to trigger promise resolution
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promiseListeners: { [key: string]: (...arg: any) => void } = {
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
