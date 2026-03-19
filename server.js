const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let parts = [];

let users = [
  { username: "operator1", password: "123" },
  { username: "quality1", password: "123" }
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
  parts.push({
    id: Date.now(),
    ...req.body,
    date: now.toLocaleDateString(),
    inTime: now.toLocaleTimeString(),
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
    part.status = req.body.status;
    part.checkedBy = req.body.checkedBy;
    part.outTime = new Date().toLocaleTimeString();
    res.send("Updated");
  }
});

// GET DATA
app.get("/parts", (req, res) => {
  res.json(parts);
});

// IMPORTANT (Render fix 🔥)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
