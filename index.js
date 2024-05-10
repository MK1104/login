const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const bodyParser = require("body-parser");
dotenv.config();

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  };
  
connectToMongo();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));


app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("mainpage");
})
app.get('/detail', (req, res) => {
    res.render('detail', { title: "Shopmee" });
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus', { title: "Shopmee" });
});

app.get('/login', (req, res) => {
    res.render('login', { title: "Shopmee" })
})

app.get('/register', (req, res) => {
    res.render('register', { title: "Shopmee" })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }); 