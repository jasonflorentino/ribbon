import FadeIn from "react-fade-in";
import Header from '../../components/Header/Header';
import HeadingHero from '../../components/HeadingHero/HeadingHero';

import "./Home.scss";

function Home()
{ 
  return (
    <div className="Main">
      <FadeIn>
        <Header color="positive" login={true} signUp={true} />
        <main>
          <HeadingHero text="You go, gifter!" />
        </main>
      </FadeIn>
    </div>
  )
}

export default Home;