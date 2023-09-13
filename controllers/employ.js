const employServices =  require("../services/employ");

const employControllers = {
    addEmployController: async (ctx) => {
        const { username, age } = ctx.request.body;
        const avatore = ctx.file.filename;
        await employServices.addEmployService(username, age, avatore);
        ctx.body = avatore;
    }
}

module.exports = employControllers;