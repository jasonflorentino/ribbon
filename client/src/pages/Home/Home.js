import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import HeadingHero from "../../components/HeadingHero/HeadingHero";
import Balloons from "../../assets/balloons.svg";

import "./Home.scss";

function Home()
{ 
  return (
    <div className="Home">
      <FadeIn>
        <Header color="positive" login={true} signUp={true} />
        <main className="Home__main">
          <HeadingHero text="You go, gifter!" className="Home__heading" />
          <h2 className="Home__subheading">The gifts they want with no loose ends.</h2>
          <img className="Home__balloons" src={Balloons} alt="Balloon graphic" />
        </main>
      </FadeIn>
    </div>
  )
}

export default Home;