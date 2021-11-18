/******************************************************************
An express server that have endpoint to get the
data from the firebase realtime database
and return it to the client and also have endpoint 
to post the data to the firebase realtime database
******************************************************************/

const express = require("express");
const bodyParser = require("body-parser");
var admin = require("firebase-admin");
var cors = require("cors");

// Fetch the service account key JSON file contents
var serviceAccount = require("./hilobudget-firebase-adminsdk.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://hilobudget-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const db = admin.database();

// Initialize the app with a service account, granting admin privileges:
const app = express();
const port = process.env.PORT || 3000;

//Middlewares:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Endpoints:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Get all the data from the firebase realtime database
app.get("/getFields", (req, res) => {
  db.ref().once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});

//Post data to the firebase realtime database:
app.post("/postUserData", (req, res) => {
    db.ref("/users/user1").set(req.body);
    res.send("Data posted successfully");
});

//Start the server:
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
