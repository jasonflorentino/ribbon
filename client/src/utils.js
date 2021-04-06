const utilFunctions = {
  assertValidEmail: assertValidEmail,
  getAuthHeader: getAuthHeader,
  getPublicUrl: getPublicUrl,
  makeFullName: makeFullName,
  verifyImageFile: verifyImageFile,
  makeDateString: makeDateString,
  makeCountdownString: makeCountdownString
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

function makeDateString(date) {
  const thisYear = new Date().getFullYear();
  date.setFullYear(thisYear);
  const locale = "en-US";
  const options = { weekday: "long", month: "long", day: "numeric" }
  return date.toLocaleDateString(locale, options);
}

function makeCountdownString(date) {
  const now = new Date();
  const thisYear = now.getFullYear();
  date.setFullYear(thisYear);
  const diff = date.getTime() - now.getTime();

  if (diff < 0) {
    return "Already past";
  }
  else {
    const days = Math.round(diff / 1000 / 60 / 60 / 24);
    const weeks = Math.round(days / 7);
    const string = days === 1 ?
                   `1 day away`
                   : days <= 13 ?
                   `${days} days away`
                   : weeks < 30 ?
                   `${weeks} weeks away`
                   : `${Math.floor(weeks/4)} months away`
    return string
  }
}

export default utilFunctions;