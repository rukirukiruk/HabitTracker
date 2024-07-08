const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json());
app.use(cors());
const habitSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    date: { type: Date, default: Date.now }
});
const Habit = mongoose.model('Habit', habitSchema);
app.get('/api/habits', async (req, res) => {
    const habits = await Habit.find();
    res.send(habits);
});
app.post('/api/habits', async (req, res) => {
    let habit = new Habit({
        name: req.body.name,
        completed: req.body.completed
    });
    habit = await habit.save();
    res.send(habit);
});
app.put('/api/habits/:id', async (req, res) => {
    const habit = await Habit.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        completed: req.body.completed
    }, { new: true });
    if (!habit) return res.status(404).send('The habit with the given ID was not found.');
    res.send(habit);
});
app.delete('/api/habits/:id', async (req, res) => {
    const habit = await Habit.findByIdAndRemove(req.params.id);
    if (!habit) return res.status(404).send('The habit with the given ID was not found.');
    res.send(habit);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));