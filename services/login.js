const LoginManagerModel = require("../model/LogingManagerModel");

const LoginService = {
    createLoginService: async (username, password) => {
        return LoginManagerModel.create({ username, password });
    },
    verifyLoginService: async (username, password) => {
        return LoginManagerModel.find({ username, password });
    }
}

module.exports = LoginService;