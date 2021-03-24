function getCurrentTime() {
  let now = new Date();

  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let year = now.getFullYear();
  let hours = String(now.getHours()).padStart(2,"0");
  let minutes = String(now.getMinutes()).padStart(2,"0");
  let seconds = String(now.getSeconds()).padStart(2,"0");
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function logRequest(req) {
  console.log(`(${getCurrentTime()}) Received: ${req.method} to ${req.url}`);
}

function logResponse(res) {
  console.log(`(${getCurrentTime()}) Sent:     ${res.statusCode} - ${res.statusMessage}`);
}

module.exports = {
  logRequest: logRequest,
  logResponse: logResponse
};