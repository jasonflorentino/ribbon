

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}

module.exports = {
  getToken: getToken
};