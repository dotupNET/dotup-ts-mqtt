import { getLogger as getLog4jLogger, Log4js, Logger, configure, Configuration } from "log4js";

export type Log4jConfiguration = Configuration


export function ConfigureLogging(filename: string): void;
export function ConfigureLogging(config: Log4jConfiguration): Log4js;
export function ConfigureLogging(config: Log4jConfiguration | string): Log4js {
  if(typeof config ==="string"){
    return configure(config);
  }else{
    return configure(config);
  }
}

export function getNamedLogger(loggerName?: string): Logger {
  return getLog4jLogger(loggerName || "MqttConnection");
}