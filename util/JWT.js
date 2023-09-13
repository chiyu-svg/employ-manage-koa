const jwt = require("jsonwebtoken");
const secret = "empty_manager";

const JWT = {
    // value 接受一个对象
    generate: (value, expires) => {
        return jwt.sign(value, secret, { expiresIn: expires });
    },
    verify: (token) => {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return false;
        }
    }
}

module.exports = JWT;