const Router = require("koa-router");
const router = new Router();
const JWT = require("../util/JWT");

router.get("/", async (ctx) => {
   await ctx.render("login"); // 这里格外要注意，渲染的模版是异步加载的，所以要使用 await 进行等待
})
router.put("/", (ctx) => {
    const { username, password } = ctx.request.body;
    if(username === "admin" && password === "1234") {
        // ctx.cookies.set("username", "admin"); 配置 cookie
        // ctx.session.user = "admin";  配置 session
        const token = JWT.generate({username, password}, "1d");
        ctx.set("Authorization", token); // 这里和 express 不同， koa 使用的是 set 设置响应头
        ctx.body = {ok: 1};
    } else {
        ctx.body = {ok: 0};
    }
})

module.exports = router;