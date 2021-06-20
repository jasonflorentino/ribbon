require("dotenv").config();
const { errorHandler } = require("./_helpers/errorHandler");
const authenticate = require("./_helpers/authenticate");
const ratelimiter = require('./_helpers/rate_limiter');
const express = require("express");
const morgan = require("morgan");
const helmet = require('helmet');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === "production";

// Middlewares
app.use(morgan(isProd ? "combined" : "dev"));
app.use(helmet());
app.use(ratelimiter);
app.use(cors());
app.use(express.json());

app.use("/public", (req, res, next) => {
  express.static("public")(req, res, next);
  return;
});

// Routes
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use(authenticate);
app.use("/check-auth", require("./routes/checkAuth"));
app.use("/connections", require("./routes/connectionRoutes"));
app.use("/gifts", require("./routes/giftRoutes"));
app.use("/list", require("./routes/listRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))