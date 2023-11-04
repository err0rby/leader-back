const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());
app.use(require("./routes/users.route"));
app.use(require('./routes/event.route'))
app.use(require('./routes/admin.route'))


mongoose
    .connect('mongodb+srv://djamalayl32:yakhya@cluster0.eb0ykyh.mongodb.net/leader')

    .then(() => console.log("mongoose connect"))
    .catch(() => console.log("mongoose warning"));

app.listen(3030, () => {
    console.log("Server start");
});
