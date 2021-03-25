import { useState } from "react";
import ButtonPrimary from './components/ButtonPrimary/ButtonPrimary';
import InputType from './components/InputType/InputType';
import HeroHeading from './components/HeroHeading/HeroHeading';
import './styles/App.scss';

function App()
{
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="App">
      <HeroHeading text="You go, gifter!" />
      <InputType
        type={"password"}
        name={"confirmPassword"}
        value={confirmPassword} 
        placeholder={"Confirm password"} 
        onChange={e => setConfirmPassword(e.target.value)}  
      />
      <ButtonPrimary text="Sign up" />
    </div>
  );
}

export default App;
