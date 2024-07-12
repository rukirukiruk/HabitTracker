const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(express.json());
app.use(cors());

const habitSchema = new mongoose.Schema({
    name: String,
    isCompleted: Boolean,
    creationDate: { type: Date, default: Date.now }
});

const Habit = mongoose.model('Habit', habitSchema);

app.get('/api/habits', async (req, res) => {
    try {
        const allHabits = await Habit.find();
        res.send(allHabits);
    } catch (error) {
        res.status(500).send("Error retrieving habits.");
    }
});

app.post('/api/habits', async (req, res) => {
    try {
        let newHabit = new Habit({
            name: req.body.name,
            isCompleted: req.body.isCompleted
        });
        newHabit = await newHabit.save();
        res.send(newHabit);
    } catch (error) {
        res.status(500).send("Error creating habit.");
    }
});

app.put('/api/habits/:id', async (req, res) => {
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isCompleted: req.body.isCompleted
        }, { new: true });

        if (!updatedHabit) return res.status(404).send('Habit not found.');

        res.send(updatedHabit);
    } catch (error) {
        res.status(500).send("Error updating habit.");
    }
});

app.delete('/api/habits/:id', async (req, res) => {
    try {
        const deletedHabit = await Habit.findByIdAndRemove(req.params.id);

        if (!deletedHabit) return res.status(404).send('Habit not found.');

        res.send(deletedHabit);
    } catch (error) {
        res.status(500).send("Error deleting habit.");
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));