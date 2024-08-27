const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/api/habits';
const habitsListElement = document.getElementById('habitsList');
const addForm = document.getElementById('addHabitForm');
const updateForm = document.getElementById('updateHabitForm');

const fetchHabits = async () => {
  try {
    const response = await fetch(API_URL);
    const habits = await response.json();
    displayHabits(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
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
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    fetchHabits();
  } catch (error) {
    console.error('Error adding habit:', error);
  }
};

const updateHabit = async (id, habit) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    fetchHabits();
  } catch (error) {
    console.error('Error updating habit:', error);
  }
};

const deleteHabit = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchHabits();
  } catch (error) {
    console.error('Error deleting habit:', error);
  }
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitName = addForm.elements['habitName'].value;
  if (habitName) addHabit({ name: habitName });
});

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitId = updateForm.elements['habitId'].value;
  const habitName = updateForm.elements['habitName'].value;
  if (habitId && habitName) updateHabit(habitId, { name: habitName });
});

document.addEventListener('DOMContentLoaded', () => {
  fetchHabits();
});