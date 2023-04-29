import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CustomRequest } from '../types';

const sessionHandler = (request: CustomRequest, response: Response, next: NextFunction) => {
  /**
   *
   * Parse cookies in incoming request:
   *
   */
  const cookieString = request.get('Cookie') || '';

  const parsedCookies = cookieString.split('; ').reduce((cookies: Record<string, string>, cookie: string) => {
    if (cookie.length) {
      const index = cookie.indexOf('=');
      const key = cookie.slice(0, index);
      const token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  if (parsedCookies.session_id) {
    request.session_id = parsedCookies.session_id;
  } else {
    request.session_id = uuidv4();
    response.cookie('session_id', request.session_id, {
      sameSite: 'lax',
      secure: true
    });
  }

  next();
};

export default sessionHandler;
