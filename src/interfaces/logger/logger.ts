import { pino } from 'pino';
import { pinoHttp } from 'pino-http';
import type { Request, Response } from 'express';

const isDev = process.env.NODE_ENV === 'development';

/**
 * @summary Logger instance using Pino
 */
export const logger = pino({
  level: isDev ? 'debug' : 'info',
  transport: isDev
    ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    }
    : undefined,
});

/**
 * @summary HTTP logger middleware
 */
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';

    return 'info';
  },
  serializers: {
    req(req: Request) {
      return {
        method: req.method,
        url: req.url,
        headers: req.headers,
      };
    },
    res(res: Response) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

/**
 * @summary Log an event with optional context
 */
export function logEvent(event: string, context: Record<string, unknown>) {
  logger.info(event);
  if (context) logger.debug(context, event);
}
