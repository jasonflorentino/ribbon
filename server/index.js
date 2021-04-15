const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const utils = require("./utils");
const loginRoutes = require("./routes/loginRoutes");
const listRoutes = require("./routes/listRoutes");
const signupRoutes = require("./routes/signupRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const giftRoutes = require("./routes/giftRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const Bookshelf = require("./bookshelf");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;
const publicRoutes = ["/login", "/signup"]
const isProd = false && process.env.NODE_ENV === "production";

/*============
 * MIDDLEWARE 
 *============*/

app.use(morgan(isProd ? "combined" : "dev"));
app.use(cors());
app.use(express.json());

// Serve resquests for static assets
app.use("/public", (req, res, next) => {
  express.static("public")(req, res, next);
  return;
});

// Verify JSON web token
app.use((req, res, next) => {
  if (publicRoutes.includes(req.url)) next();
  else {
    if (!req.headers.authorization) {
      res.status(403).json({ message: "Not authorized: Authorization header required." });
    }
    const token = utils.getToken(req);
    if (!token) {
      res.status(403).json({ message: "Not authorized: No token." });
    } else {
      try {
        req.decode = jwt.verify(token, JWT_SECRET)
        next();
      } catch (err) {
        console.log("JWT Verify Error:", err.message);
        res.status(403).json({ message: "Not authorized: Invalid token." });
      }
    }
  }
})

/*========
 * ROUTES 
 *========*/

// Provide user's info to front end from token
app.get("/check-auth", (req, res) => {
  const query = "SELECT p.image, p.first_name, l.id AS list_id FROM people AS p INNER JOIN users AS u LEFT JOIN lists AS l ON l.user_id = u.id WHERE p.user_id = u.id AND u.uuid = :uuid;";

  Bookshelf.knex.raw(query, {uuid: req.decode.user})
  .then(result => {
    if (result[0].length === 0) {
      res.status(403).json({message: "Couldn't authenticate user"})
      return;
    }
    const data = result[0][0];
    req.decode.image = data.image || "placeholder.png";
    req.decode.first_name = data.first_name;
    req.decode.list_id = data.list_id;
    res.status(200).json(req.decode)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error with the server"})
    console.error(err);
  })
});

app.use("/connections", connectionRoutes);
app.use("/gifts", giftRoutes);
app.use("/list", listRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/upload", uploadRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))