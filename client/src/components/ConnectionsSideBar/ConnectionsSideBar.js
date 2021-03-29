import userImage from "../../assets/user-image.png";
import UserImage from "../UserImage/UserImage";
import "./ConnectionsSideBar.scss";

function ConnectionsSideBar() {
  return (
    <aside className="ConnectionsSideBar">
      <UserImage role="sidebar" imgSrc={userImage} altText="User image" />
      <UserImage role="sidebar" imgSrc={userImage} altText="User image" />
      <UserImage role="sidebar" imgSrc={userImage} altText="User image" />
    </aside>
  )
}

export default ConnectionsSideBar;