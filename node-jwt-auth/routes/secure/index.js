
const router = require("express").Router();
const verifyTokenMiddleware = require("../../auth/json-validation")


router.get("/test",verifyTokenMiddleware,(req,res)=>{
    res.status(200).send("OK");
})

module.exports = router;