import "./UserImage.scss";

function UserImage({role, imgSrc, altText}) {

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
      <img className={classText} src={imgSrc} alt={altText} />
      {role === "sidebar" && <span className="UserImage__name">Johnny English</span>}
    </>
  )
}

export default UserImage;