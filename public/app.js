const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/api/habits';
const habitsListElement = document.getElementById('habitsList');
const addForm = document.getElementById('addHabitForm');
const updateForm = document.getElementById('updateHabitForm');
const resetButton = document.getElementById('resetHabitsButton');
const errorMessageElement = document.getElementById('errorMessage');

const fetchHabits = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch habits.');
    }
    const habits = await response.json();
    displayHabits(habits);
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching habits.');
  }
};

const displayHabits = (habits) => {
  habitsListElement.innerHTML = '';
  habits.forEach((habit) => {
    const habitElement = document.createElement('li');
    habitElement.textContent = habit.name;
    if (habit.completed) {
      habitElement.style.textDecoration = 'line-through';
    }
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => completeHabit(habit.id);
    habitElement.appendChild(completeButton);
    habitsListElement.appendChild(habitElement);
  });
};

const completeHabit = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/complete`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to complete the habit.');
    }
    fetchHabits();
  } catch (error) {
    console.error('Error completing habit:', error);
    showError('An error occurred while marking habit as complete.');
  }
};

const resetHabits = async () => {
  try {
    const response = await fetch(`${API_URL}/reset`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to reset habits.');
    }
    fetchHabits();
  } catch (error) {
    console.error('Error resetting habits:', error);
    showError('An error occurred while trying to reset all habits.');
  }
};

resetButton.addEventListener('click', resetHabits);

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitName = addForm.elements['habitName'].value;
  if (habitName) addHabit({ name: habitName });
  addForm.reset();
});

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitId = updateForm.elements['habitId'].value;
  const habitName = updateForm.elements['habitName'].value;
  if (habitId && habitName) updateHabit(habitId, { name: habitName });
  updateForm.reset();
});

document.addEventListener('DOMContentLoaded', fetchHabits);