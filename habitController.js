const Habit = require("./models/Habit");

exports.createHabit = async (req, res) => {
    try {
        const newHabit = new Habit({
            name: req.body.name,
            description: req.body.description,
            frequency: req.body.frequency,
        });

        const saveHabit = await newHabit.save();
        res.status(201).json(saveHabit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (habit == null) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (habit == null) {
            return res.status(404).json({ message: "Habit not found" });
        }
        if (req.body.name != null) {
            habit.name = req.body.name;
        }
        if (req.body.description != null) {
            habit.description = req.body.description;
        }
        if (req.body.frequency != null) {
            habit.frequency = req.body.frequency;
        }

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (habit == null) {
            return res.status(404).json({ message: "Habit not found" });
        }
        await habit.remove();
        res.json({ message: "Deleted Habit" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};