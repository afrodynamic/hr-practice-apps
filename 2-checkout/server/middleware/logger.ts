import { NextFunction, Response } from 'express';

import { CustomRequest } from '../types';

const logger = (request: CustomRequest, response: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()} | session_id: ${request.session_id} | ${request.method} ${ request.url }`
  );
  next();
};

export default logger;
