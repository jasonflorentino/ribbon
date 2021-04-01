import { useState, useEffect } from "react";
import axios from "axios";
import UserListHeader from "./UserListHeader";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import "./UserList.scss";

function UserList({match, userDetails})
{
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + `/user/${id}`;
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        setItems(res.data.items);
        setUser(res.data.user);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log("UserList FetchData():", err);
      })
  }, [id])

  return (
    <>
      {loading ? <Loading /> :
        (
          <>
            <UserListHeader firstName={user.first_name} userImage={user.image} />
            <ItemGrid items={items} owner={false} userDetails={userDetails} />
          </>
        )
      }
    </>
  )
}

export default UserList;