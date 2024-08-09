const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connection Successful'))
  .catch(err => console.error('MongoDB Connection Failed...', err));

const habitTrackerSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: [true, 'Habit name is required']
  },
  trackingStartDate: {
    type: Date,
    required: [true, 'Tracking start date is required'],
    default: Date.now
  },
  trackingFrequency: {
    type: String,
    required: [true, 'Tracking frequency is required'],
    enum: {
      values: ['Daily', 'Weekly', 'Monthly'],
      message: '{VALUE} frequency is not supported'
    }
  }
});

const HabitTracker = mongoose.model('HabitTracker', habitTrackerSchema);

function logAllHabits() {
  HabitTracker.find({}, (err, habits) => {
    if (err) {
      console.error('Failed to retrieve habits', err);
      return;
    }
    console.log('All Habits:', habits);
  });
}

mongoose.connection.once('open', () => {
  logAllHabits();
});

module.exports = {
  HabitTracker,
  logAllHabits
};