const express = require('express');
const app = express();

app.use(express.json());

app.use("/", require("./routes/auth"));
app.use("/users", require('./routes/users'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});