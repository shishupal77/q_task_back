require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const authRoute=require('./routes/authroutes.js')
const crudRoute=require('./routes/crudroutes.js')


app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute)
app.use("/api/user", crudRoute)


const URI = process.env.MONGODB_URL;

mongoose.connect(URI).then(() => console.log("Database connected..")).catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

