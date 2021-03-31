import UserImage from "../../components/UserImage/UserImage";
import MainHeading from "../../components/MainHeading/MainHeading";
import utils from "../../utils";
import "./DashboardHeader.scss";

function DashboardHeader({userImage})
{ 
  return (
    <header className="DashboardHeader">
      <UserImage 
        role="main" 
        linkPath="/user/profile/id"
        imgSrc={utils.getPublicUrl(userImage)} 
        altText="User image" 
      />
      <MainHeading text="Your wish list" />
    </header>
  )
}

export default DashboardHeader;