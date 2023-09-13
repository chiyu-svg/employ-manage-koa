const mongoose = require("mongoose"); // 这和数据库连接的导入的是同一个对象
const Schema = mongoose.Schema;

const employ = {
    username: String,
    age: String,
    avator: String
};

const AdminModel = mongoose.model("employ", new Schema(employ));

module.exports = AdminModel;