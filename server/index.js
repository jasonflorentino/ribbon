const express = require('express');
const cors = require('cors');
const utils = require("./utils/utils");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

/*============
 * MIDDLEWARE 
 *============*/

app.use(express.json());
app.use(cors());

// Log incoming requests
app.use((req, _res, next) => {
  utils.logRequest(req);
  next();
})

/*========
 * ROUTES 
 *========*/

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))