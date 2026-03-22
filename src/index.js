const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");

// req.body ko data JSON format ma huncha so needs to into Javascript Object.

app.use(express.json());
app.use(cookieParser);

main()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server Listening at port number: " + process.env.PORT);
    });
  })
  .catch((err) => console.log("Error Occured: " + err));
