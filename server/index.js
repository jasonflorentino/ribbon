const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const loginRoutes = require("./routes/loginRoutes");
const listRoutes = require("./routes/listRoutes");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;
const publicRoutes = ["/login", "/signup"]

/*============
 * MIDDLEWARE 
 *============*/

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, _res, next) => {
  utils.logRequest(req);
  next();
})

// Serve resquests for static assets
app.use("/public", (req, res, next) => {
  express.static("public")(req, res, next);
  utils.logResponse(res);
  return;
});


// Verify JSON web token
app.use((req, res, next) => {
  if (publicRoutes.includes(req.url)) next();
  else {
    if (!req.headers.authorization) {
      res.status(403).json({ message: "Not authorized: Authorization header required." });
      return utils.logResponse(res);
    }
    const token = utils.getToken(req);
    if (!token) {
      res.status(403).json({ message: "Not authorized: No token." });
      utils.logResponse(res); 
    } else {
      try {
        req.decode = jwt.verify(token, JWT_SECRET)
        next();
      } catch (err) {
        console.log("JWT Verify Error:", err.message);
        res.status(403).json({ message: "Not authorized: Invalid token." });
        utils.logResponse(res);
      }
    }
  }
})

/*========
 * ROUTES 
 *========*/

app.get("/check-auth", (req, res) => {
  res.status(200).json(req.decode);
  utils.logResponse(res);
});

app.use("/login", loginRoutes);
app.use("/list", listRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))