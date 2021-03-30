import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import "./MobileHomeActions.scss";

function MobileHomeActions({login, signUp, history})
{
  return (
    <div className={`MobileHomeActions`}>
      {login && <Link className="MobileHomeActions__login" to="/login">Login</Link>}
      {signUp && <ButtonPrimary 
        text="Sign up" 
        onClick={() => history.push("/signup")} 
      />}
    </div>
  )
}

export default withRouter(MobileHomeActions);