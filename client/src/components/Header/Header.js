import { Link } from "react-router-dom";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import Logo from "../Logo/Logo";
import "./Header.scss";

function Header({color, login, signUp})
{
  return (
    <header className={`Header`}>
      <Logo color={color} />
      <div>
        {login && <Link className="Header__Login" to="/login">Login</Link>}
        {signUp && <ButtonPrimary text="Sign up" />}
      </div>
    </header>
  )
}

export default Header;