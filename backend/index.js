const express = require("express");
const db = require("./models");
const cors = require("cors");

const PORT = 2000;
const app = express();

app.use(express.json());
app.use(cors());

app.get(`/`, (req, res) => {
  res.status(200).send(`This is my API`);
});

const {userRouter, authRouter, eventRouter} = require("./routers");
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);

app.listen(PORT, () => {
  // db.sequelize.sync();
  console.log(`Server running at port ${PORT}`);
});
