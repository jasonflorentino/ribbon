import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import Logo from "../Logo/Logo";
import "./Header.scss";

function Header({color, login, signUp, logout, history})
{
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    window.location.reload()
  }

  return (
    <header className={`Header`}>
      <Logo color={color} />
      <div className="Header__actions">
        {login && <Link className="Header__login" to="/login">Login</Link>}
        {logout && <Link className="Header__logout" to="/" onClick={handleLogout}>Logout</Link>}
        {signUp && <ButtonPrimary 
          text="Sign up" 
          onClick={() => history.push("/signup")} 
        />}
      </div>
    </header>
  )
}

export default withRouter(Header);