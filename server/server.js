const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/StockDB";
const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => console.log("connected..."));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const itemRouter = require("./routers/items");
app.use("/items", itemRouter);

app.listen(3001, () => console.log("server started"));
