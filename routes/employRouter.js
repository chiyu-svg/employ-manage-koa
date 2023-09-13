const Router = require("koa-router");
const multer = require("@koa/multer");
const upload = multer({dest: "uploads/"});
const router = new Router();
const employController = require("../controllers/employ");

// router.get("/", (ctx) => {
//     ctx.body = "user manager";
// })
// router.get("/add", (ctx) => {
//     const { username, password } = ctx.query; // get 请求参数直接可以获取请求
//     ctx.body = "ok";
// })
// router.post("/create", (ctx) => {
//     const body = ctx.request.body; // post获取 请求参数
//     ctx.body = "ok";
// })
router.post("/", upload.single("avator"), employController.addEmployController);


module.exports = router;