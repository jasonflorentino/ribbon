import { useState } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from '../../components/Header/Header';
import FormSignUp from '../../components/FormSignUp/FormSignUp';

import "./SignUp.scss";

function SignUp({setIsAuthenticated, history})
{ 
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const requestSignUp = (email, password) => {
    const url = process.env.REACT_APP_API_URL + "/signup";
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.token);
        setIsSignUpError(false);
        history.push("/")
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsSignUpError(true);
        return;
      });
  }

  return (
    <div className="SignUp">
      <FadeIn className="SignUp__fadeContainer">
        <Header color="negative" login={true} />
        <main className="SignUp__main">
          <FormSignUp 
            requestSignUp={requestSignUp}
            isSignUpError={isSignUpError}
            setIsSignUpError={setIsSignUpError}
            errorMessage={errorMessage}
          />
        </main>
      </FadeIn>
    </div>
  )
}

export default SignUp;