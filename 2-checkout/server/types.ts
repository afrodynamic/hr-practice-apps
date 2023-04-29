import { Request } from 'express';

export interface CustomRequest extends Request {
  session_id?: string;
}
