import { useState } from "react";
// import axios from "axios";
import FormSignUp from '../../components/FormSignUp/FormSignUp';

import "./SignUp.scss";

function SignUp({setIsAuthenticated, history, setIsLoading})
{ 
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const requestSignUp = (email, password) => {
    setErrorMessage("")
    alert("Sorry! I've turned off Signup for now.\n—Jason");
    return;
  
    // const url = process.env.REACT_APP_API_URL + "/signup";
    // axios
    //   .post(url, {
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     sessionStorage.setItem("authToken", res.data.token);
    //     setIsSignUpError(false);
    //     setIsLoading(true);
    //     setIsAuthenticated(true);
    //   })
    //   .then(() => {
    //     history.push("/");
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.response.data.message);
    //     setIsSignUpError(true);
    //     return;
    //   });
  }

  return (
    <FormSignUp 
      requestSignUp={requestSignUp}
      isSignUpError={isSignUpError}
      setIsSignUpError={setIsSignUpError}
      errorMessage={errorMessage}
    />
  )
}

export default SignUp;