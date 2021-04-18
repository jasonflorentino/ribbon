const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const publicRoutes = [
    "/users/authenticate", 
    "/users/register"
  ];
  
  if (publicRoutes.includes(req.url)) return next();
  
  let accessToken = req.cookies.jwt;
  if (!accessToken) return res.status(401).json({message: "No access token"});

  let payload;
  try {
    req.decode = jwt.verify(accessToken, process.env.JWT_SECRET);
    next();
  }
  catch(e) {
    return res.status(403).json({message: "Invalid access token"});
  }
}