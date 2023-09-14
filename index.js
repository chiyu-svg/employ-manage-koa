const koa = require("koa");
const loginRouter = require("./routes/loginRouter");
const employRouter = require("./routes/employRouter");
const homeRouter = require("./routes/homeRouter");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const session = require("koa-session-minimal");
require("./config/db.config"); // 创建数据连接
require("./ws/webSocketServer"); 

const router = new Router();
const app = new koa();

// 配置静态资源文件
app.use(static(path.join(__dirname, "public")));
app.use(static(path.join(__dirname, "uploads")));
// 配置 post 请求参数解析器
app.use(bodyParser());
// 配置渲染引擎 ejs
app.use(views(path.join(__dirname, "views"),{extension: "ejs"}));

// 配置 session
app.use(session({
    key: "employ_manager",
    cookie: {
        maxAge: 1000 * 60
    }
}))

// 可以很方便的在前面加上前缀
// router.prefix("/api");

// 统一处理验证鉴权 jwt 与这验证大致相同
// router.use( async (ctx, next) => {
//     if(ctx.url.includes("login")) {
//         return await next();
//     }
//     // 获取cookie
//     // if(!ctx.cookies.get("username")) {
//     if(!ctx.session.user){
//         ctx.redirect("/login")
//     } else {
//         ctx.session.date = Date.now(); // 刷新 seesion 生效时间
//        await next(); // 注意这里的 await， 因为控制权会回来
//     }
// })



// 先注册成路由级组件
// 当请求的方法不允许时会返回关于请求方法的错误消息
router.use("/login", loginRouter.routes(), loginRouter.allowedMethods());
router.use("/home", homeRouter.routes(), homeRouter.allowedMethods());
router.use("/employ", employRouter.routes(), employRouter.allowedMethods());
// router.user("/webchat", )

// 重定向路由路径
router.redirect("/", "/login.html");

// 再注册成应用级组件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);