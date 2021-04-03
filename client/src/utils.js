const utilFunctions = {
  assertValidEmail: assertValidEmail,
  getAuthHeader: getAuthHeader,
  getPublicUrl: getPublicUrl,
  makeFullName: makeFullName,
  verifyImageFile: verifyImageFile
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

function verifyImageFile(file) {
  if (!file) return false;
  
  switch (file.type) {
    case "image/jpeg":
      break;
    case "image/png":
      break;
    default:
      alert("Sorry, we only accept JPGs and PNGs right now.");
      return false;
  }

  const sizeLimit = 5; // in MB
  if (file.size > (sizeLimit * 1024 * 1024)) {
    alert(`Please choose an image less than ${sizeLimit}MB in size.`);
    return false;
  }

  return true;
}

export default utilFunctions;