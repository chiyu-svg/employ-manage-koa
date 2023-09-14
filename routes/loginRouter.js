const Router = require("koa-router");
const router = new Router();
const loginController = require("../controllers/LoginManage");

router.get("/", async (ctx) => {
   await ctx.render("login"); // 这里格外要注意，渲染的模版是异步加载的，所以要使用 await 进行等待
})
router.put("/", loginController.loginVerifyController);
router.post("/", loginController.loginCreateController);

router.get("/chart", async (ctx) => {
    await ctx.render("webChart")
})

module.exports = router;