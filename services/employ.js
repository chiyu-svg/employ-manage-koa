const EmployModel = require("../model/EmployModel");

const employService = {
    addEmployService: async (username, age, avator) => {
        return EmployModel.create({username, age, avator});
    }
}

module.exports = employService;