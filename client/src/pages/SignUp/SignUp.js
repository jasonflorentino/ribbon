import FadeIn from "react-fade-in";
import Header from '../../components/Header/Header';

import "./SignUp.scss";

function SignUp()
{ 
  return (
    <div className="SignUp">
      <FadeIn>
        <Header color="negative" login={true} signUp={false} />
        <main>
          sign up
        </main>
      </FadeIn>
    </div>
  )
}

export default SignUp;