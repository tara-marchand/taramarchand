import { NextRequest, NextResponse } from 'next/server';
import pinoHttp from 'pino-http';

export default function middleware(request: NextRequest) {
  const pinoLogger = pinoHttp();
  const response = NextResponse.next();

  pinoLogger.logger.info(request);
  pinoLogger.logger.info(response);

  return response;
}
