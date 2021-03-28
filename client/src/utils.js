export default {
  assertValidEmail: assertValidEmail
}

function assertValidEmail(str) {
  const re = /^[\w\d]+@[\w\d]+\.[\w]+$/
  return re.test(str);
}