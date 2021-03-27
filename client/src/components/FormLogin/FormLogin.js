import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import InputType from '../InputType/InputType';
import "./FormLogin.scss";

function FormLogin()
{
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <FadeIn>
      <form
        className="FormLogin"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="FormLogin__heading">Let's get giftin'</h1>
        <InputType
          type={"text"}
          name={"email"}
          value={email} 
          placeholder={"Your email"} 
          onChange={e => setEmail(e.target.value)}  
        />
        <InputType
          type={"password"}
          name={"password"}
          value={password} 
          placeholder={"Password"} 
          onChange={e => setPassword(e.target.value)}  
        />
        <Link to="/" className="FormLogin__forgotPassword">Forgot password?</Link>
        <ButtonPrimary className="FormLogin__button" text="Login" />
      </form>
    </FadeIn>
  )
}

export default FormLogin;