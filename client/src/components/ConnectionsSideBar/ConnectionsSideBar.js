import UserImage from "../UserImage/UserImage";
import utils from "../../utils";
import "./ConnectionsSideBar.scss";

function ConnectionsSideBar({connections}) {
  return (
    <aside className="ConnectionsSideBar">
      {connections.map(({uuid, first_name, last_name, image}) => {
        const fullName = utils.makeFullName(first_name, last_name)
        return <UserImage 
          key={"user" + uuid}
          role="sidebar"
          name={fullName}
          imgSrc={utils.getPublicUrl(image)} 
          altText={fullName} />
      })}
    </aside>
  )
}

export default ConnectionsSideBar;