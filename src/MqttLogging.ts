import { getLogger as getLog4jLogger, Logger, configure, Configuration } from "log4js";

export type Log4jConfiguration = Configuration

export function ConfigureLogging(config: Log4jConfiguration) {
  configure(config);
}

export function getNamedLogger(loggerName?: string): Logger {
  return getLog4jLogger(loggerName || "MqttConnection");
}