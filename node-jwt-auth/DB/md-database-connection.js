const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();
const dbPath = process.env.DB_CONNECTION_URL;
mongoose.connect(dbPath, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
module.exports = mongoose;
