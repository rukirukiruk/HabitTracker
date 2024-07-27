const Habit = require("./models/Habit");

exports.createHabit = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.frequency) {
            throw new Error("Missing required fields: name, description, and frequency are all required.");
        }

        const newHabit = new Habit({
            name: req.body.name,
            description: req.body.description,
            frequency: req.body.frequency,
        });

        const saveHabit = await newHabit.save();
        res.status(201).json(saveHabit);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a new habit: " + error.message });
    }
};

exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch habits: " + error.message });
    }
};

exports.getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: "Error finding habit: " + error.message });
    }
};

exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        habit.name = req.body.name ?? habit.name;
        habit.description = req.body.description ?? habit.description;
        habit.frequency = req.body.frequency ?? habit.frequency;

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (error) {
        res.status(400).json({ message: "Failed to update habit: " + error.message });
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        await habit.remove();
        res.json({ message: "Deleted Habit" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete habit: " + error.message });
    }
};