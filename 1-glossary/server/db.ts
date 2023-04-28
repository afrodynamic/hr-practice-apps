import { Model, Schema, connect, model } from 'mongoose';

export interface GlossaryType extends Document{
  term: string;
  description: string;
}

// 1. Use mongoose to establish a connection to MongoDB
connect('mongodb://localhost:27017/glossary');

// 2. Set up any schema and models needed by the app
const glossarySchema: Schema = new Schema({
  term: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// 3. Export the models
const Glossary: Model<GlossaryType> = model<GlossaryType>('Glossary', glossarySchema);
export default Glossary;

// 4. Import the models into any modules that need them
