import userImage from "../../assets/user-image.png";
import UserImage from "../../components/UserImage/UserImage";
import MainHeading from "../../components/MainHeading/MainHeading";
import "./DashboardHeader.scss";

function DashboardHeader()
{ 
  return (
    <header className="DashboardHeader">
      <UserImage role="main" imgSrc={userImage} altText="User image" />
      <MainHeading text="Your wish list" />
    </header>
  )
}

export default DashboardHeader;