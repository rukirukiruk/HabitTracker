const express = require('express');
const habitController = require('./habitController');
const { celebrate, Joi, errors } = require('celebrate'); // Add Joi validation

const router = express.Router();

// Validation schema
const habitSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    streak: Joi.number().integer().min(0).optional()
});

router.post('/habits', celebrate({ body: habitSchema }), async (req, res, next) => {
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

router.put('/habits/:id', celebrate({ body: habitSchema }), async (req, res, next) => {
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

// Error handler for validation errors
router.use(errors());

router.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;