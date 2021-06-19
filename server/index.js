require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Bookshelf = require("./bookshelf");
const { errorHandler } = require("./_helpers/errorHandler");
const authenticate = require("./_helpers/authenticate");

const app = express();

const PORT = process.env.PORT || 8080;
const isProd = false && process.env.NODE_ENV === "production";


// Middlewares
app.use(morgan(isProd ? "combined" : "dev"));
app.use(cors());
app.use(express.json());


app.use("/public", (req, res, next) => {
  express.static("public")(req, res, next);
  return;
});

/*========
 * ROUTES 
 *========*/

// Provide user's info to front end from token


app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use(authenticate);

app.get("/check-auth", (req, res, next) => {
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
    console.error(err);
    next(err);
  })
});

app.use("/connections", require("./routes/connectionRoutes"));
app.use("/gifts", require("./routes/giftRoutes"));
app.use("/list", require("./routes/listRoutes"));
app.use("/login", require("./routes/loginRoutes"));
app.use("/signup", require("./routes/signupRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))