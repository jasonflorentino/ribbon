import { useState } from "react";
import axios from "axios";
import FormLogin from "../../components/FormLogin/FormLogin";
import "./Login.scss";

function Login({setIsAuthenticated, history})
{
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const requestLogin = (email, password) => {
    setIsLoading(true);
    const url = process.env.REACT_APP_API_URL + "/login";
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.token);
        setIsLoginError(false);
        setIsAuthenticated(true);
        setIsLoading(false);
        history.push("/")
      })
      .catch((err) => {
        setErrorMessage(err.response && err.response.data.message);
        setIsLoginError(true);
        setIsLoading(false);
        return;
      });
  };

  return ( 
    <FormLogin 
      requestLogin={requestLogin}
      isLoginError={isLoginError}
      setIsLoginError={setIsLoginError} 
      errorMessage={errorMessage}  
      isLoading={isLoading}
    />
  )
}

export default Login;