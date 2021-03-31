import { useState, useEffect } from "react";
import axios from "axios";
import UserListHeader from "./UserListHeader";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import utils from "../../utils";
import "./UserList.scss";

function UserList({match, setConnections, allConnections})
{
  const id = match.params.id;
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  const fetchData = () => {
    const url = process.env.REACT_APP_API_URL + `/user/${id}`;
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        setItems(res.data.items);
        setUser(res.data.user);
      })
      .catch(err => {
        console.log("UserList FetchData():", err);
      })
  }

  useEffect(() => {
    fetchData()
    const withoutMatch = allConnections.filter(conn => conn.uuid !== id);
    setConnections(withoutMatch);
  }, [id])

  return (
    <>
      <UserListHeader firstName={user.first_name} userImage={user.image} />
      <ItemGrid items={items} owner={false} />
    </>
  )
}

export default UserList;