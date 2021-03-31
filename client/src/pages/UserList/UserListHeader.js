import UserImage from "../../components/UserImage/UserImage";
import MainHeading from "../../components/MainHeading/MainHeading";
import utils from "../../utils";
import "./UserListHeader.scss";

function UserListHeader({firstName, userImage})
{ 
  return (
    <header className="UserListHeader">
      <UserImage 
        role="main" 
        linkPath="/user/profile/id"
        imgSrc={utils.getPublicUrl(userImage)} 
        altText="User image" 
      />
      <MainHeading text={`${firstName}'s wish list`} />
    </header>
  )
}

export default UserListHeader;