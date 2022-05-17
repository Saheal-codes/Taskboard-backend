const usermodel = require("../models/usermodel");
const taskmodel = require("../models/taskmodel");

// a function that adds a task into the user's database
exports.addTask = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      _id: req.user._id,
    });
    const task = await taskmodel.create({
      task_name: req.body.task_name,
      task_description: req.body.task_description,
      task_status: req.body.task_status,
      user_id: user._id,
    });
    res.status(200).send({ message: "Task added successfully", data: task });
  } catch (error) {
    res.status(500).send(error);
  }
};
// a function that deletes a task from the user's database
exports.deleteTask = async (req, res) => {
  try {
    const task = await taskmodel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Task deleted successfully", data: task });
  } catch (error) {
    res.status(500).send(error);
  }
};

// a function to show all the tasks of the user in the database
exports.showTasks = async (req, res) => {
  try {
    const tasks = await taskmodel.find({
      user_id: req.user._id,
    });
    res
      .status(200)
      .send({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    res.status(500).send(error);
  }
};

// a function  to show pending tasks of the user in the database
exports.showPendingTasks = async (req, res) => {
  try {
    const tasks = await taskmodel.find({
      user_id: req.user._id,
      task_status: "Pending",
    });
    res
      .status(200)
      .send({ message: "Pending tasks fetched successfully", data: tasks });
  } catch (error) {
    res.status(500).send(error);
  }
};
