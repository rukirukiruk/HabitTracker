import React, { useState } from 'react';

const HabitForm = ({ onSubmit, initialData = {} }) => {
  const [habitName, setHabitName] = useState(initialData.name || '');
  const [startDate, setStartDate] = useState(initialData.startDate || '');
  const [frequency, setFrequency] = useState(initialData.frequency || '');

  const validateForm = () => {
    if (!habitName || !startDate || !frequency) {
      alert('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ habitName, startDate, frequency });
      setHabitName('');
      setStartDate('');
      setFrequency('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="habitName">Habit Name:</label>
        <input
          type="text"
          id="habitName"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="frequency">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HabitForm;