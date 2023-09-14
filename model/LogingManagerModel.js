const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminType = {
    username: String,
    password: String
}

const EmployModel = mongoose.model("admin", new Schema(AdminType));

module.exports = EmployModel;