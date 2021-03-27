import { Link } from "react-router-dom";
import LogoNegative from "../../assets/ribbon-logo-negative.svg";
import LogoPositive from "../../assets/ribbon-logo-positive.svg";
import "./Logo.scss";

function Logo({color})
{
  const getLogoSrc = (color) =>
  {
    switch (color)
    {
      case "negative":
        return LogoNegative;
      case "positive":
        return LogoPositive;
      default:
        return LogoPositive;
    }
  }

  return (
    <Link to="/">
      <img 
        src={getLogoSrc(color)}
        alt="Ribbon logo"
        className="Logo"
      />
    </Link>
  )
}

export default Logo;