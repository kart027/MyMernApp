const mongoconnect = require("./databse");
const express = require("express");
const app = express();
const authroutes = require("./routes/auth");
const notesroute = require("./routes/Notes")
var cors = require('cors')








mongoconnect();
app.use(cors())
app.use(express.json())
app.use("/get/auth",authroutes);
app.use("/get/notes",notesroute)

app.listen(5000);