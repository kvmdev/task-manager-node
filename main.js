const express = require('express');
const app = express();
const path = require("path");

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./routes/pages"));
app.use("/api/users", require("./routes/users"));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});