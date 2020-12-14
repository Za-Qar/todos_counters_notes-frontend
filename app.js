const express = require("express");
const { router } = require("./routes/items");
const port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
const cors = require("cors");

// //To fix cors error
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//Initialise app
const app = express();

app.use(cors());

app.use(bodyParser.json());

//hand the router to app
app.use("/", router);

app.listen(port, function () {
  console.log(`Listenting on port ${port}`);
});
