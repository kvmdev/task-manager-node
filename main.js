const path = require("path");
const express = require('express');
const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/users", require("./routes/users"));
app.use("/", require("./routes/pages"));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});