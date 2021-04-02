import { useState, useEffect } from "react";
import axios from "axios";
import UserListHeader from "./UserListHeader";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import "./UserList.scss";

function UserList({match, userDetails, history})
{
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  const fetchItems = () => {
    if (!loading) setLoading(true);
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
        alert("An error occurred while loading this user's list!")
        history.replace("/");
        window.location.reload()
        console.log("UserList FetchData():", err);
      })
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [id])

  const requestClaimGift = (claimerId, itemId) => {
    const url = process.env.REACT_APP_API_URL + `/gifts/${itemId}/claim?user=${claimerId}`;
    axios
      .put(url,{},{headers: utils.getAuthHeader()})
      .then(res => {
        fetchItems();
      })
      .catch(err => {
        console.log("UserList requestClaimGift():", err);
      })
  }

  return loading ? 
    <Loading />  :
    (
      <>
        <UserListHeader firstName={user.first_name} userImage={user.image} />
        <ItemGrid items={items} owner={false} userDetails={userDetails} requestClaimGift={requestClaimGift} />
      </>
    )
}

export default UserList;