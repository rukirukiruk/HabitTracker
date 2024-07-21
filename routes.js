const express = require('express');
const habitController = require('./habitController');

const router = express.Router();

router.post('/habits', async (req, res, next) => {
    try {
        await habitController.createHabit(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/habits', async (req, res, next) => {
    try {
        await habitController.getAllHabits(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/habits/:id', async (req, res, next) => {
    try {
        await habitController.getHabitById(req, res);
    } catch (error) {
        next(error);
    }
});

router.put('/habits/:id', async (req, res, next) => {
    try {
        await habitController.updateHabit(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/habits/:id', async (req, res, next) => {
    try {
        await habitController.deleteHabit(req, res);
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;