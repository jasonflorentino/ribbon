import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import utils from "../../utils";
import "./ConnectionsSideBar.scss";

function ConnectionsSideBar({connections, userDetails, location}) 
{
  const [showSelf, setShowSelf] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      setShowSelf(false);
    } else {
      setShowSelf(true);
    }
  }, [location.pathname])

  const [filteredConnections, setFilteredConnections] = useState([]);
  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const uuid = pathArr[pathArr.length-1]
    if (!uuid) return setFilteredConnections(connections);
    setFilteredConnections(connections.filter(conn => conn.uuid !== uuid));
  }, [location.pathname, connections])

  return (
    <aside className="ConnectionsSideBar">
      {showSelf && <UserImage 
        role="sidebar"
        name="Your list"
        linkPath="/"
        imgSrc={utils.getPublicUrl(userDetails.image)} 
        altText="Your image"  
      />}
      {filteredConnections.map(({uuid, first_name, last_name, image}) => {
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

export default withRouter(ConnectionsSideBar);