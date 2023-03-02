import { Injectable, LoggerService } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const logLevels = process.env.LOG_LEVELS.split(',');

@Injectable()
export class LoggingService implements LoggerService {
  private errorLogFile: string;
  private errorLogMaxSize: number;
  private errorLogStream: fs.WriteStream;
  private errorLogCurrentSize: number;

  constructor() {
    this.errorLogFile = path.join(
      path.dirname(__filename),
      `../${process.env.LOG_DIRNAME}/log.log`,
    );
    this.errorLogStream = fs.createWriteStream(this.errorLogFile, {
      flags: 'a',
    });
    this.errorLogMaxSize = parseInt(process.env.LOG_FILE_SIZE) * 1024;
    this.errorLogCurrentSize = this.getFileSize(this.errorLogFile);
    // Create the logs directory if it doesn't exist
    if (!fs.existsSync(path.dirname(this.errorLogFile))) {
      fs.mkdirSync(path.dirname(this.errorLogFile), { recursive: true });
    }
    // Create the error log file if it doesn't exist
    if (!fs.existsSync(this.errorLogFile)) {
      fs.writeFileSync(this.errorLogFile, '');
    }
  }

  private writeToErrorLog(logMessage: string) {
    if (this.errorLogCurrentSize + logMessage.length > this.errorLogMaxSize) {
      this.rotateErrorLogFile();
    }
    this.errorLogStream.write(logMessage + '\n');
    this.errorLogCurrentSize += logMessage.length;
  }

  private rotateErrorLogFile() {
    this.errorLogStream.end();
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const newErrorLogFile = path.join(
      path.dirname(__filename),
      `../${process.env.LOG_DIRNAME}/log-${timestamp}.log`,
    );
    fs.renameSync(this.errorLogFile, newErrorLogFile);
    this.errorLogStream = fs.createWriteStream(this.errorLogFile, {
      flags: 'a',
    });
    this.errorLogCurrentSize = 0;
  }

  private getFileSize(filePath: string): number {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (err) {
      return 0;
    }
  }

  writeErrorLog(exception, data) {
    const timestamp = new Date().toISOString();
    const { url, params, body, method, statusCode } = data;
    const logMessage = `${timestamp}: ${exception}, Request with url: ${JSON.stringify(
      url,
    )}, query params: ${JSON.stringify(params)}, status code: ${JSON.stringify(
      statusCode,
    )}, body: ${JSON.stringify(body)}, method: ${method}`;
    this.writeToErrorLog(logMessage);
  }

  writeRequestLog(data) {
    const timestamp = new Date().toISOString();
    const { url, params, body, method, statusCode } = data;
    const logMessage = `${timestamp}: Request with url: ${JSON.stringify(
      url,
    )}, query params: ${JSON.stringify(params)}, status code: ${JSON.stringify(
      statusCode,
    )}, body: ${JSON.stringify(body)}, method: ${method}`;
    this.writeToErrorLog(logMessage);
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf('log') > -1) {
      console.log('log:', message, ...optionalParams);
    }
  }
  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf('error') > -1) {
      console.error('error:', message, ...optionalParams);
    }
  }
  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf('warn') > -1) {
      console.warn('warn:', message, ...optionalParams);
    }
  }
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf('debug') > -1) {
      console.debug('debug:', message, ...optionalParams);
    }
  }
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf('verbose') > -1) {
      console.log('verbose:', message, ...optionalParams);
    }
  }
}
