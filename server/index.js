require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const verify = require("./_helpers/verify");
const errorHandler = require("./_helpers/errorHandler");

const app = express();

const PORT = process.env.PORT || 8080;
const isProd = false && process.env.NODE_ENV === "production";

// Middleware
app.use(morgan(isProd ? "combined" : "dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/public", (req, res, next) => express.static("public")(req, res, next));

app.use(verify);
app.get("/check-auth", (req, res) => res.status(200).json(req.decode));
app.use("/users", require("./users/users.controller"));

// TODO: Update following routes to controller / service
app.use("/connections", require("./routes/connectionRoutes"));
app.use("/gifts", require("./routes/giftRoutes"));
app.use("/list", require("./routes/listRoutes"));
app.use("/login", require("./routes/loginRoutes"));
app.use("/signup", require("./routes/signupRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))