const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/api/habits';
const habitsListElement = document.getElementById('habitsList');
const addForm = document.getElementById('addHabitForm');
const updateForm = document.getElementById('updateHabitForm');
const errorMessageElement = document.getElementById('errorMessage'); // Ensure you have this element in your HTML for displaying errors

const showError = (message) => {
  errorMessageElement.textContent = message; // Display error message
  errorMessageElement.style.display = 'block'; // Make sure to hide it initially using CSS
};

const fetchHabits = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch habits from the server.');
    }
    const habits = await response.json();
    displayHabits(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    showError('An error occurred while fetching habits.');
  }
};

const displayHabits = (habits) => {
  habitsListElement.innerHTML = '';
  habits.forEach((habit) => {
    const habitElement = document.createElement('li');
    habitElement.textContent = habit.name;
    habitsListElement.appendChild(habitElement);
  });
};

const addHabit = async (habit) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error('Failed to add a new habit.');
    }
    fetchHabits();
  } catch (error) {
    console.error('Error adding habit:', error);
    showError('An error occurred while trying to add a new habit.');
  }
};

const updateHabit = async (id, habit) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error('Failed to update the habit.');
    }
    fetchHabits();
  } catch (error) {
    console.error('Error updating habit:', error);
    showError('An error occurred while trying to update the habit.');
  }
};

const deleteHabit = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the habit.');
    }
    fetchHabits();
  } catch (error) {
    console.error('Error deleting habit:', error);
    showError('An error occurred while trying to delete the habit.');
  }
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitName = addForm.elements['habitName'].value;
  if (habitName) addHabit({ name: habitName });
  addForm.reset(); // Reset form after submission
});

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitId = updateForm.elements['habitId'].value;
  const habitName = updateForm.elements['habitName'].value;
  if (habitId && habitName) updateHabit(habitId, { name: habitName });
  updateForm.reset(); // Reset form after submission
});

document.addEventListener('DOMContentLoaded', () => {
  fetchHabits();
});