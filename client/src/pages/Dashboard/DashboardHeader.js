import UserImage from "../../components/UserImage/UserImage";
import MainHeading from "../../components/MainHeading/MainHeading";
import utils from "../../utils";
import "./DashboardHeader.scss";

function DashboardHeader({userDetails})
{ 
  return (
    <header className="DashboardHeader">
      <UserImage
        role="main" 
        linkPath={`/user/profile/${userDetails.id}`}
        imgSrc={utils.getPublicUrl(userDetails.image)} 
        altText="User image" 
      />
      <MainHeading text="Your wish list" />
    </header>
  )
}

export default DashboardHeader;