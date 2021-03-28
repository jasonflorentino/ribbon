import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import InputType from '../InputType/InputType';
import InputError from '../InputError/InputError';
import utils from "../../utils";
import "./FormLogin.scss";

function FormLogin({requestLogin, isLoginError, errorMessage, setIsLoginError})
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !utils.assertValidEmail(email)) return setIsEmailError(true);
    if (!password) return setIsPasswordError(true);
    requestLogin(email, password);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setIsEmailError(false);
    setIsLoginError(false);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setIsPasswordError(false);
    setIsLoginError(false);
  }

  return (
    <FadeIn>
      <form
        className="FormLogin"
        onSubmit={e => handleSubmit(e)}
      >
        <h1 className="FormLogin__heading">Let's get giftin'</h1>
        <InputType
          type={"text"}
          name={"email"}
          value={email} 
          placeholder={"Your email"} 
          onChange={e => handleEmailChange(e)}  
          error={isEmailError}
          errorMsg="You must enter a valid email"
        />
        <InputType
          type={"password"}
          name={"password"}
          value={password} 
          placeholder={"Password"} 
          onChange={e => handlePasswordChange(e)}  
          error={isPasswordError}
          errorMsg="You must provide a password"
        />
        <Link to="/" className="FormLogin__forgotPassword">Forgot password?</Link>
        <ButtonPrimary className="FormLogin__button" text="Login" error={isLoginError} />
        {isLoginError && <InputError text={errorMessage} />}
      </form>
    </FadeIn>
  )
}

export default FormLogin;