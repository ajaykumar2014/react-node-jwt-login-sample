
const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(" Payload is "+JSON.stringify(verified));
        req.id = verified;
        next();

    } catch (error) {
        res.satatus(401).send("Invalid token");
    }
}