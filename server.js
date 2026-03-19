const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

let parts = [];

let users = [
  { username: "operator1", password: "123", role: "operator" },
  { username: "quality1", password: "123", role: "quality" }
];

// LOGIN
app.post("/login", (req, res) => {
  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  );
  if (user) res.json(user);
  else res.status(401).send("Invalid");
});

// ADD PART
app.post("/add", (req, res) => {
  const now = new Date();
  const hour = now.getHours();

  let shift = hour < 14 ? "Shift A" : hour < 22 ? "Shift B" : "Shift C";

  parts.push({
    id: Date.now(),
    ...req.body,
    date: now.toLocaleDateString(),
    inTime: now.toLocaleTimeString(),
    shift,
    status: "",
    outTime: "",
    checkedBy: ""
  });

  res.send("Saved");
});

// UPDATE STATUS
app.post("/status", (req, res) => {
  const part = parts.find(p => p.id == req.body.id);

  if (part) {
    const now = new Date();

    part.status = req.body.status;
    part.checkedBy = req.body.checkedBy;
    part.outTime = now.toLocaleTimeString();

    res.send("Updated");
  }
});

// GET DATA
app.get("/parts", (req, res) => {
  res.json(parts);
});

app.listen(3000);
