require("./config/database");
const express = require('express');
const app = express();
const path = require("path");
const session = require("express-session");

app.use(express.json());

app.use(session({
    secret: "6294862",
    resave: true,
    saveUninitialized: true/* ,
    cookie: { secure: false, maxAge: 3600000 } */ // Adjust as needed
}));

/* app.use((req, res, next) => {
    if (req.session.isAuthenticated === undefined) {
        req.session.isAuthenticated = false;
    }
    next();
   
}); */

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/pages"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));

app.use((req, res) => {
    res.status(404).send("Not found page");
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});