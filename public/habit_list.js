import React, { useState, useEffect } from 'react';

const DUMMY_HABITS = [
  { id: 'h1', name: 'Drink water', completed: false },
  { id: 'h2', name: '10,000 steps', completed: true },
  { id: 'h3', name: 'Read a book', completed: false },
];

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const updateHabitsInBackend = debounce(async (habits) => {
  // Simulate API call
  console.log('Updating habits in backend:', habits);
  // Example:
  // await fetch('your-api-endpoint/habits', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ habits }),
  // });
}, 2000); // Adjust debounce time as needed

const Habit = ({ habit, toggleHabitCompletion }) => {
  return (
    <li>
      {habit.name}
      <input
        type="checkbox"
        checked={habit.completed}
        onChange={() => toggleHabitCompletion(habit.id)}
      />
    </li>
  );
};

const HabitTracker = () => {
  const [habits, setHabits] = useState(DUMMY_HABITS);

  const toggleHabitCompletion = (habitId) => {
    setHabits((habits) =>
      habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  };

  // Whenever habits change, update them in the backend.
  useEffect(() => {
    updateHabitsInBackend(habits);
  }, [habits]);

  return (
    <div>
      <h2>My Habits</h2>
      <ul>
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            toggleHabitCompletion={toggleHabitCompletion}
          />
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;