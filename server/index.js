const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messages = ["Chat connected."];

app.get("/api/msg", (req, res) => {
  if (messages.length > 0) res.json(messages.pop());
  else res.json("");
  console.log("@@@ request", new Date().getSeconds());
});

app.post("/api/msg", (req, res) => {
  messages.push(req.body.msg);
  console.log(req.body.msg);
  res.status(200).end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
