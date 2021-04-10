const express = require("express");
const app = express();
const cors = require("cors");
const jsonParser = express.json();

const PORT = process.env.PORT || 5000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

app.use(jsonParser);
app.use(cors());


app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

//routers

const userLogin = require("./routers/auth");
app.use("/login", userLogin);

const User = require("./routers/user");
app.use("/", User);

const Books = require("./routers/books");
app.use("/", Books);
