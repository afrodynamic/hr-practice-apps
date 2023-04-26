const mongoose = require('mongoose');

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017/glossary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Set up any schema and models needed by the app
const glossarySchema = new mongoose.Schema({
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
const Glossary = mongoose.model('Glossary', glossarySchema);
module.exports = Glossary;

// 4. Import the models into any modules that need them
