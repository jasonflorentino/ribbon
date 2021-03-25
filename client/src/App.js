import React from "react";
import ButtonPrimary from './components/ButtonPrimary/ButtonPrimary';
import InputType from './components/InputType/InputType';
import HeroHeading from './components/HeroHeading/HeroHeading';
import './styles/App.scss';

class App extends React.Component
{
  state = {
    confirmPassword: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render()
  {
    const {confirmPassword} = this.state;
    return (
      <div className="App">
        <HeroHeading text="You go, gifter!" />
        <InputType
          type={"password"}
          name={"confirmPassword"}
          value={confirmPassword} 
          placeholder={"Confirm password"} 
          onChange={this.handleChange}  
        />
        <ButtonPrimary text="Sign up" />
      </div>
    );
  }
}

export default App;
