import { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import ItemDetailsBadges from "./ItemDetailsBadges";
import ItemDetailsActions from "./ItemDetailsActions";
import "./ItemDetails.scss";

function ItemDetails({history, match, userDetails})
{
  const [loading, setLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState({});
  
  const fetchData = () => {
    if (!loading) setLoading(true);
    const url = process.env.REACT_APP_API_URL + `/gifts/${match.params.id}`
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        setItemInfo(res.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        alert("An error occurred while loading this page");
        history.goBack();
        window.location.reload();
        console.log(err);
      })
  }

  const requestClaimSubmit = (itemId) => {
    const claimerUuid = userDetails.id;
    const url = process.env.REACT_APP_API_URL + `/gifts/${itemId}/claim?user=${claimerUuid}`;
    axios
      .put(url,{},{headers: utils.getAuthHeader()})
      .then(res => {
        fetchData();
      })
      .catch(err => {
        alert("There was an error while claiming this gift");
        window.location.reload();
        console.log("ItemDetails requestClaimSubmit():", err);
      })
  }

  const requestReleaseSubmit = (itemId) => {
    const claimerUuid = userDetails.id;
    const url = process.env.REACT_APP_API_URL + `/gifts/${itemId}/release?user=${claimerUuid}`;
    axios
      .put(url,{},{headers: utils.getAuthHeader()})
      .then(_res => {
        fetchData();
      })
      .catch(err => {
        alert("There was an error while releasing this gift");
        window.location.reload();
        console.log("ItemDetails requestReleaseSubmit():", err);
      })
  }

  const requestDelete = (itemId) => {
    const url = process.env.REACT_APP_API_URL + `/gifts/${itemId}`;

    axios
      .delete(url, {headers: utils.getAuthHeader()})
      .then(() => {
        history.push("/");
        window.location.reload();
      })
      .catch(err => {
        alert("There was an error while trying to delete this gift");
        window.location.reload();
        console.log("ItemDetails requestDelete():", err);
      })
  }

  useEffect(() => {
    fetchData();
      // eslint-disable-next-line
  }, [match.params.id])

  const includeBadges = () => {
    return itemInfo.color
        || itemInfo.size
        || itemInfo.first_name
  }

  return loading ? <Loading /> :
    <FadeIn>
      <header className="ItemDetails__header">
        <ButtonBack />
        <MainHeading text={itemInfo.name} price={itemInfo.price} />
      </header>
      <main className="ItemDetails__main">
        <img 
          className="ItemDetails__image" 
          src={utils.getPublicUrl(itemInfo.image)}
          alt={itemInfo.name}
        />
        <div className="ItemDetails__description">
          {includeBadges() && <ItemDetailsBadges
            currUserListId={userDetails.list_id} 
            currUserName={userDetails.first_name} 
            list_id={itemInfo.list_id}
            color={itemInfo.color}
            size={itemInfo.size}
            first_name={itemInfo.first_name}
          />}
          <p className="ItemDetails__descriptionText">{itemInfo.description}</p>
          <ItemDetailsActions 
            currUserListId={userDetails.list_id} 
            list_id={itemInfo.list_id}
            itemName={itemInfo.name}
            currUserName={userDetails.first_name} 
            first_name={itemInfo.first_name}
            external_link={itemInfo.external_link}
            itemId={itemInfo.id}
            requestClaimSubmit={requestClaimSubmit}
            requestReleaseSubmit={requestReleaseSubmit}
            requestDelete={requestDelete}
          />
        </div>
      </main>
    </FadeIn>
}

export default ItemDetails;