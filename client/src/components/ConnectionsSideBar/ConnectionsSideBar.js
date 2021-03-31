import { useState, useEffect } from "react";
import UserImage from "../UserImage/UserImage";
import utils from "../../utils";
import "./ConnectionsSideBar.scss";

function ConnectionsSideBar({connections, location, userDetails}) 
{
  const [showSelf, setShowSelf] = useState(false);
  useEffect(() => {
    if (!showSelf && location.pathname !== "/") {
      setShowSelf(true);
    } else if (showSelf && location.pathname === "/") {
      setShowSelf(false);
    }
  }, [location.pathname, showSelf])

  return (
    <aside className="ConnectionsSideBar">
      {showSelf && <UserImage 
        role="sidebar"
        name="Your list"
        linkPath="/"
        imgSrc={utils.getPublicUrl(userDetails.image)} 
        altText="Your image"  
      />}
      {connections.map(({uuid, first_name, last_name, image}) => {
        const fullName = utils.makeFullName(first_name, last_name)
        return <UserImage 
          key={"user" + uuid}
          role="sidebar"
          name={fullName}
          linkPath={`/user/${uuid}`}
          imgSrc={utils.getPublicUrl(image)} 
          altText={fullName} 
        />
      })}
    </aside>
  )
}

export default ConnectionsSideBar;