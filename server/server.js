const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
let url;
if (process.env.NODE_ENV === "development") {
  url = process.env.DATABASE_DEV_URL;
} else if (process.env.NODE_ENV === "test") {
  url = process.env.DATABASE_TEST_URL;
}
console.log(url);
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => console.log("connected..."));

app.use(express.json());
// app.use(cookieParser);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
const itemRouter = require("./routers/items");
const authRouter = require("./routers/Auth");
app.use("/auth", authRouter);
app.use("/items", itemRouter);

app.listen(3001, () => console.log("server started"));

/******************************************/
// const DepartmentSchema = new mongoose.Schema({
//   name: String,
//   location: String,
// });

// const EmployeeSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   mobile: Number,
//   department: { type: mongoose.Schema.Types.ObjectId, ref: "department" },
// });

// const companySchema = new mongoose.Schema({
//   name: String,
//   location: String,
//   employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee" }],
// });

// var Employee = mongoose.model("employee", EmployeeSchema);
// var Department = mongoose.model("department", DepartmentSchema);
// var Company = mongoose.model("company", companySchema);

// app.use("/", async (req, res) => {
//   await Department.deleteMany({});
//   await Department.create({
//     name: "CS",
//     location: "AB-1",
//   });
//   await Department.create({
//     name: "Mechanical",
//     location: "AB-5",
//   });
//   await Employee.deleteMany({});
//   await Employee.create({
//     firstName: "Lakshya",
//     lastName: "Kumar",
//     mobile: 13848824749,
//     department: await Department.findOne({ name: "CS" }),
//   });
//   await Employee.create({
//     firstName: "Ayush",
//     lastName: "Dubey",
//     mobile: 138488484849,
//     department: await Department.findOne({ name: "Mechanical" }),
//   });
//   await Employee.create({
//     firstName: "Harsh",
//     lastName: "Taliwal",
//     mobile: 138488254449,
//     department: await Department.findOne({ name: "CS" }),
//   });
//   await Employee.create({
//     firstName: "Deepak",
//     lastName: "Yadav",
//     mobile: 23848824749,
//     department: await Department.findOne({ name: "Mechanical" }),
//   });
//   await Company.deleteMany({});
//   await Company.create({
//     name: "Company-A",
//     location: "Bengaluru",
//     employees: await Employee.find(),
//   });
//   res.json({
//     departments: await Department.find(),
//     employees: await Employee.find(),
//     employeesWithDepartment: await Employee.find().populate("department"),
//     company: await Company.find().populate({
//       path: "employees",
//       model: "employee",
//       populate: {
//         path: "department",
//         model: "department",
//       },
//     }),
//   });
// });

module.exports = app;
