const Habit = require("./models/Habit");

const validateHabitInput = (body) => {
    return body.name && body.description && body.frequency;
};

const createAndSaveHabit = async (body) => {
    const newHabit = new Habit({
        name: body.name,
        description: body.description,
        frequency: body.frequency,
    });
    return await newHabit.save();
};

exports.createHabit = async (req, res) => {
    try {
        if (!validateHabitInput(req.body)) {
            throw new Error("Missing required fields: name, description, and frequency are all required.");
        }

        const savedHabit = await createAndSaveHabit(req.body);
        res.status(201).json(savedHabit);
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

const findHabitById = async (id) => {
    return await Habit.findById(id);
};

exports.getHabitById = async (req, res) => {
    try {
        const habit = await findHabitById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.json(habit);
    } catch (error) {
        handleHabitErrors(res, error);
    }
};

const updateHabitDetails = (habit, body) => {
    habit.name = body.name ?? habit.name;
    habit.description = body.description ?? habit.description;
    habit.frequency = body.frequency ?? habit.frequency;
    return habit;
};

exports.updateHabit = async (req, res) => {
    try {
        let habit = await findHabitById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        habit = updateHabitDetails(habit, req.body);
        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (error) {
        handleHabitErrors(res, error, true);
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        const habit = await findHabitById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        await habit.remove();
        res.status(200).json({ message: "Deleted Habit" });
    } catch (error) {
        handleHabitErrors(res, error);
    }
};

const handleHabitErrors = (res, error, isUpdate = false) => {
    if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid habit id format: " + error.message });
    } else if (isUpdate && error.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation error: " + error.message });
    }
    res.status(500).json({ message: "Server Error: " + error.message });
};