import { Document } from 'mongoose';

export interface Glossary extends Document{
  term: string;
  description: string;
}
