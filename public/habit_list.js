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
}, 2000);

const Habit = ({ habit, toggleHabitCompletion, deleteHabit }) => {
    return (
        <li>
            {habit.name}
            <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabitCompletion(habit.id)}
            />
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
        </li>
    );
};

const HabitTracker = () => {
    const [habits, setHabits] = useState(DUMMY_HABITS);
    const [newHabitName, setNewHabitName] = useState('');

    const toggleHabitCompletion = (habitId) => {
        setHabits((habits) =>
            habits.map((habit) =>
                habit.id === habitId ? { ...habit, completed: !habit.completed } : habit,
            ),
        );
    };

    const addHabit = () => {
        const newHabit = {
            id: `h${habits.length + 1}`,
            name: newHabitName,
            completed: false,
        };
        setHabits([...habits, newHabit]);
        setNewHabitName('');
    };

    const deleteHabit = (habitId) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    };

    // Whenever habits change, update them in the backend.
    useEffect(() => {
        updateHabitsInBackend(habits);
    }, [habits]);

    return (
        <div>
            <h2>My Habits</h2>
            <input
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="Enter new habit"
            />
            <button onClick={addHabit}>Add Habit</button>
            <ul>
                {habits.map((habit) => (
                    <Habit
                        key={habit.id}
                        habit={habit}
                        toggleHabitCompletion={toggleHabitCompletion}
                        deleteHabit={deleteHabit}
                    />
                ))}
            </ul>
        </div>
    );
};

export default HabitTracker;