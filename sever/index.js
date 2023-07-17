const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const toDoModel = require("./models/ToDo");
const cors = require("cors");
const BigTaskModel = require("./models/ToDo");
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://firstapp:FirstApp1@cluster0.qpkk5om.mongodb.net/mern?retryWrites=true&w=majority"
);

app.get("/getBigTasks", async (req, res) => {
  try {
    const response = await BigTaskModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
  console.log("getBigTasks")
});

// app.get("/getSmallTasksByID", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   try {
//     const ParentBigTask = await BigTaskModel.findById(id);
//     console.log(json(id));
//     const response = await ParentBigTask.name;
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// app.put("/updateUser", async (req, res) => {
//   const newAge = req.body.newAge;
//   const id = req.body.id;
//   console.log(newAge, id);
//   try {
//     const friendToUpdate = await UserModel.findById(id);
//     friendToUpdate.age = Number(newAge);
//     friendToUpdate.save();
//   } catch (err) {
//     console.log(err);
//   }
//   res.send("updated");
// });

app.put("/updateBigTask", async (req, res) => {
  const newName = req.body.newName;
  const id = req.body.id;

  try {
    const TodoToUpdate = await BigTaskModel.findById(id);
    TodoToUpdate.name = newName;
    TodoToUpdate.save();
  } catch (err) {
    console.log(err);
  }
  res.send("yessir");
  console.log("updateBigTask")
});

app.post("/createBigTask", async (req, res) => {
  const BigTask = req.body;
  const newBigTask = await new BigTaskModel(BigTask);
  await newBigTask.save();
  res.json(newBigTask._id);
  console.log("createBigTask")

});

app.delete("/deleteBigTask/:id", async (req, res) => {
  const id = req.params.id;
  await BigTaskModel.findByIdAndRemove(id).exec();
  res.send("deleted item");
  console.log("deleteBigTask")

});

app.put("/addSmallTask", async (req, res) => {
  const smallTasks = req.body.name;
  const id = req.body.id;

  try {
    const bigTaskToAddSmallTask = await BigTaskModel.findById(id);
    bigTaskToAddSmallTask.list.push(smallTasks);
    bigTaskToAddSmallTask.save();
    res.json(smallTasks);
  } catch (err) {
    console.log(err);
  }
});
app.put("/deleteSmallTask", async (req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  str = `list.${index}`;
  try {
    await BigTaskModel.updateOne({ _id: id }, { $set: { [str]: "null" } });
    // await BigTaskModel.updateOne({}, { $pull: { list: null } });

    res.json(index);
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateSmallTask", async (req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  const name = req.body.name;
  console.log(req.body.name);
  str1 = `list.${index}`;
  try {
    await BigTaskModel.updateOne({ _id: id }, { $set: { [str1]: name } });
    res.json("moxda");
  } catch (err) {
    console.log(err);
  }
});

app.put("/completeBigTask", async (req, res) => {
  const id = req.body.id;
  try {
    const TodoTocomplete = await BigTaskModel.findById(id);
    TodoTocomplete.completed = !TodoTocomplete.completed;
    TodoTocomplete.save();
    res.json("moxda");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("we be running in this bitch");
});
