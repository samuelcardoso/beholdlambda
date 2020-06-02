import * as util from 'util';
import { identity } from 'lodash';
import { basename } from 'path';
import { createLogger as winston, format, transports } from 'winston';
// const CloudWatchTransport = require('winston-aws-cloudwatch');
const { combine, label, timestamp, colorize, printf } = format;
// const crypto = require('crypto');

const inspect = (subject: any): string => typeof subject === 'string' ? subject : util.inspect(subject);
const meta = Symbol.for('splat') as any;
const logFormat = printf((info) =>
  `[${info.timestamp}]-[${info.label}]-[${info.level}]: ${[
    info.message,
    ...info[meta] || []
  ].filter(identity).map(inspect).join(', ')}`);
// const startTime = new Date().toISOString();

export function createLogger(groupName: string) {
  const logger = winston({
    transports: [
      new transports.Console({ level: 'debug' })
      // new CloudWatchTransport({
      //   logGroupName: groupName,
      //   logStreamName: () => {
      //     const date = new Date().toISOString().split('T')[0];
      //     return 'express-server-' + date + '-' +
      //       crypto.createHash('md5')
      //         .update(startTime)
      //         .digest('hex');
      //   },
      //   createLogGroup: true,
      //   createLogStream: true,
      //   submissionInterval: 2000,
      //   submissionRetryCount: 1,
      //   batchSize: 20,
      //   awsConfig: {
      //     accessKeyId: process.env.AWS_CLOUDWATCH_ACCESS_KEY_ID,
      //     secretAccessKey: process.env.AWS_CLOUDWATCH_ACCESS_KEY_ID,
      //     region: process.env.AWS_CLOUDWATCH_REGION
      //   },
      //   formatLog: item =>
      //     `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
      // })
    ],
    format: combine(
      label({ label: basename(groupName) }),
      timestamp(),
      colorize(),
      logFormat
    )
  });
  return logger;
}
