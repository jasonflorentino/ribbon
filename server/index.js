const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const utils = require("./utils");
const loginRoutes = require("./routes/loginRoutes");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

/*============
 * MIDDLEWARE 
 *============*/

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Log incoming requests
app.use((req, _res, next) => {
  utils.logRequest(req);
  next();
})

// utils.getToken()

/*========
 * ROUTES 
 *========*/

app.use("/login", loginRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))