import HeadingHero from '../../components/HeadingHero/HeadingHero';
import FormLogin from '../../components/FormLogin/FormLogin';

import "./Home.scss";

function Home()
{ 
  return (
    <main>
      Home Page
      <HeadingHero text="You go, gifter!" />
      <FormLogin />
    </main>
  )
}

export default Home;