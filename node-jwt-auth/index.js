const express = require("express")

const authRoute = require("./routes")
const secureRoute = require("./routes/secure/index")
const dotEnv = require("dotenv");

const app = express();

dotEnv.config();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers","*");
    next();
})
//Middleware
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/secure",secureRoute);
app.listen(3000, () => console.log("Server is up and running"));


