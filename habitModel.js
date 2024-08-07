const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    enum: {
      values: ['Daily', 'Weekly', 'Monthly'],
      message: '{VALUE} is not supported'
    }
  }
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;