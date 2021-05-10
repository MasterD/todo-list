const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List_Schema = new Schema({
    username: {type: String, required: true},
    date: {type: Date, required: true},
    task: {type: String, required: true}
},
{timestamps: true,});

const List = mongoose.model("List", List_Schema);

module.exports = List;