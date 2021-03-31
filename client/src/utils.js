const utilFunctions = {
  assertValidEmail: assertValidEmail,
  getAuthHeader: getAuthHeader,
  getPublicUrl: getPublicUrl,
  makeFullName: makeFullName
}

function assertValidEmail(str) {
  const re = /^[\w\d]+@[\w\d]+\.[\w]+$/
  return re.test(str);
}

function getAuthHeader() {
  const token = sessionStorage.getItem("authToken");
  return { Authorization: `Bearer ${token}` }
}

function getPublicUrl(fileName) {
  return process.env.REACT_APP_API_URL + `/public/${fileName}`;
}

function makeFullName(first, last) {
  return `${first} ${last}`;
}

export default utilFunctions;