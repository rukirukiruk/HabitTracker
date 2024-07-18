const express = require('express');
const habitController = require('./habitController');

const router = express.Router();

router.post('/habits', habitController.createHabit);

router.get('/habits', habitController.getAllHabits);

router.get('/habits/:id', habitController.getHabitById);

router.put('/habits/:id', habitController.updateHabit);

router.delete('/habits/:id', habitController.deleteHabit);

module.exports = a router;