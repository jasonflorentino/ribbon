import { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import HeadingHero from "../../components/HeadingHero/HeadingHero";
import MobileHomeActions from "../../components/MobileHomeActions/MobileHomeActions";
import Balloons from "../../assets/balloons.svg";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import "./Home.scss";

function Home({location, setIsAuthenticated, setIsLoading})
{ 
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);
  const [colorTheme, setColorTheme] = useState("positive");
  
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setShowLogin(true);
        setShowSignUp(true);
        setColorTheme("positive");
        break;
      case "/login":
        setShowLogin(false);
        setShowSignUp(true);
        setColorTheme("negative");
        break;
      case "/signup":
        setShowLogin(true);
        setShowSignUp(false);
        setColorTheme("negative");
        break;
      default:
        setShowLogin(true);
        setShowSignUp(true);
        setColorTheme("positive");
    }
  }, [location.pathname])

  return (
    <div className={`Home ${colorTheme === "negative" ? "Home__redBg" : ""}`}>
      <FadeIn className="Home__fadeContainer">
        <Header color={colorTheme} login={showLogin} signUp={showSignUp} />
        <main className="Home__main">
          <Switch>
            <Route path="/" exact>
              <HeadingHero text="You go, gifter!" className="Home__heading" />
              <h2 className="Home__subheading">The gifts they want with no loose ends.</h2>
              <img className="Home__balloons" src={Balloons} alt="Balloon graphic" />
            </Route>
            <Route path="/signup" render={props => {
              return <SignUp {...props} setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading} />
            }} />
            <Route path="/login" render={props => {
              return <Login {...props} setIsAuthenticated={setIsAuthenticated}  setIsLoading={setIsLoading} />
            }} />
          </Switch>
        </main>
        <MobileHomeActions login={showLogin} signUp={showSignUp} />
      </FadeIn>
    </div>
  )
}

export default withRouter(Home);