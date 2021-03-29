import { useState } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import FormLogin from "../../components/FormLogin/FormLogin"
import Header from "../../components/Header/Header"
import "./Login.scss";

function Login({setIsAuthenticated, setIsLoading, history})
{
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const requestLogin = (email, password) => {
    const url = process.env.REACT_APP_API_URL + "/login";
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.error) return setIsLoginError(true);
        sessionStorage.setItem("authToken", res.data.token);
        setIsAuthenticated(true);
        setIsLoginError(false);
        setIsLoading(true);
        history.push("/")
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoginError(true);
        return;
      });
  };

  return (
    <div className="Login">
      <FadeIn className="Login__fadeContainer">
        <Header color="negative" signUp={true} />
        <main className="Login__main">
          <FormLogin 
            requestLogin={requestLogin}
            isLoginError={isLoginError}
            setIsLoginError={setIsLoginError} 
            errorMessage={errorMessage}  
          />
        </main>
      </FadeIn>
    </div>
  )
}

export default Login;