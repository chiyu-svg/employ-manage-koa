const loginService = require("../services/login");
const JWT = require("../util/JWT");

const LoginController = {
    loginCreateController: async (ctx) => {
        const { username, password } = ctx.request.body;
        await loginService.createLoginService(username, password);
        ctx.body = {ok: 1};
    },
    loginVerifyController: async (ctx) => {
        const { username, password } = ctx.request.body;
        const data = await loginService.verifyLoginService(username, password);
        if(data.length) {
            // ctx.cookies.set("username", "admin"); 配置 cookie
            // ctx.session.user = "admin";  配置 session
            const token = JWT.generate({username, password}, "1d");
            ctx.set("Authorization", token); // 这里和 express 不同， koa 使用的是 set 设置响应头
            ctx.body = {ok: 1};
        } else {
            ctx.body = {ok: 0};
        }
    },
}

module.exports = LoginController;