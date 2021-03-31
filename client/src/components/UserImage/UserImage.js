import { Link } from "react-router-dom";
import "./UserImage.scss";

function UserImage({role, name, linkPath, imgSrc, altText}) {

  let classText = "";
  switch (role) {
    case "main":
      classText = "UserImage--main";
      break;
    case "sidebar":
      classText = "UserImage--sidebar";
      break;
    case "hero":
      classText = "UserImage--hero";
      break;
    default:
      classText = "UserImage";
      break;
  }

  return (
    <>
      <Link className="UserImage__link" to={linkPath}>
        <img className={classText} src={imgSrc} alt={altText} />
        {role === "sidebar" && <span className="UserImage__name">{name}</span>}
      </Link>
    </>
  )
}

export default UserImage;