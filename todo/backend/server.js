const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const list_route = require("./routes/lists");
const user_routes = require("./routes/users");

const app = express();
const port = process.env.PORT || 4000;
const URI = process.env.ATLAS_URI;
const connect = mongoose.connection;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.listen(port, () =>{
    console.log(`Server running on ${port}`);
})
app.use("/lists", list_route);
app.use("/users", user_routes);

mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
connect.once('open', () => {
    console.log("database is now connected")
})