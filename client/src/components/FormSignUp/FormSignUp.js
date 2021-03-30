import { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import InputType from '../InputType/InputType';
import InputError from '../InputError/InputError';
import utils from "../../utils";

import "./FormSignUp.scss";

function FormSignUp({requestSignUp, isSignUpError, setIsSignUpError, errorMessage})
{ 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword) setIsConfirmPasswordError(true);
    else setIsConfirmPasswordError(false);
  }, [password, confirmPassword])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailError(false);
    setIsSignUpError(false);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordError(false);
  }

  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !utils.assertValidEmail(email)) return setIsEmailError(true);
    if (!password) return setIsPasswordError(true);
    if (isConfirmPasswordError) return;
    requestSignUp(email, password);
  }

  return (
    <FadeIn childClassName="FormSignUp__fadeContainer">
      <form className="FormSignUp" onSubmit={handleSubmit}>
        <h1 className="FormSignUp__heading">Time to think outside the giftbox</h1>
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
        <InputType
          type={"password"}
          name={"confirmPassword"}
          value={confirmPassword} 
          placeholder={"Confirm password"} 
          onChange={e => handleConfirmPasswordChange(e)}  
          error={isConfirmPasswordError}
          errorMsg="Passwords must match"
        />
        <ButtonPrimary className="FormSignUp__button" text="Sign up" error={isSignUpError} />
        {isSignUpError && <InputError text={errorMessage} />}
      </form>
    </FadeIn>
  )
}

export default FormSignUp;