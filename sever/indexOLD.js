const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const toDoModel = require("./models/ToDo");
const cors = require("cors");
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://firstapp:FirstApp1@cluster0.qpkk5om.mongodb.net/mern?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

app.get("/getTodos", async (req, res) => {
  try {
    const response = await toDoModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

app.post("/createToDo", async (req, res) => {
  const ToDo = req.body;
  const newToDo = await new toDoModel(ToDo);
  await newToDo.save();
  res.json(ToDo);
});

app.post("/createBigTask", async (req, res) => {
  const ToDo = req.body;
  const newbigTask = await new toDoModel(ToDo);
  await newbigTask.save();
  res.json(ToDo);
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = await new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.put("/updateUser", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  console.log(newAge, id);
  try {
    const friendToUpdate = await UserModel.findById(id);
    friendToUpdate.age = Number(newAge);
    friendToUpdate.save();
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

app.put("/updateToDo", async (req, res) => {
  const newToDo = req.body.newToDo;
  const id = req.body.id;
  console.log(newToDo, id);
  try {
    const ToDoToUpdate = await toDoModel.findById(id);
    ToDoToUpdate.name = String(newToDo);
    ToDoToUpdate.save();
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});
app.delete("/deleteToDo/:id", async (req, res) => {
  const id = req.params.id;
  await toDoModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});
app.listen(3001, () => {
  console.log("we be running in this bitch");
});
