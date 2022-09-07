const { json } = require("express");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

const data = fs.readFileSync(`./db.json`, { encoding: "utf-8" });
const data2 = JSON.parse(data);
let todolist2 = data2.todolist;

const updatedDb = (updateddata) => {
  fs.writeFileSync(`./db.json`, JSON.stringify(updateddata), {
    encoding: "utf-8",
  });
};

app.get("/todolist", (req, res) => {
  res.send(todolist2);
});



app.post("/todolist", (req, res) => {
  let data3 = req.body;

  todolist2.push(data3);

  updatedDb({ ...data2, todolist2 });
  res.send("task added successfully");
});





app.delete("/todolist", (req, res) => {
  let data3 = req.body;

  todolist2.push(data3);

  updatedDb({ ...data2, todolist2 });
  res.send("task added successfully");
});


app.patch("/todolist", (req, res) => {
 
  todolist2 = todolist2.map((e) => {
    if (e.id === (req.body.id)) {
      return {
        ...e,
        status: req.body.status,
      };
    } else {
      return e;
    }
  });
  updatedDb({ ...db, todolist2 });
  res.send(todolist2);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
