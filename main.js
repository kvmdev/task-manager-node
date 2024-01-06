const express = require('express');
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});