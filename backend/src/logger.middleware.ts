import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      const color =
        status >= 500
          ? chalk.redBright
          : status >= 400
            ? chalk.red
            : status >= 300
              ? chalk.cyan
              : chalk.green;

      const method = chalk.bold(req.method.padEnd(6));
      const path = req.originalUrl;
      const time = chalk.gray(`${duration}ms`);
      const statusColored = color(status.toString());

      console.log(`[HTTP] ${method} ${path} → ${statusColored} ${time}`);
    });

    next();
  }
}
