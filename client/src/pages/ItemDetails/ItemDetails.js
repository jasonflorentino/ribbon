import { useState, useEffect } from "react";
import axios from "axios";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import ItemDetailsBadges from "./ItemDetailsBadges";
import ItemDetailsActions from "./ItemDetailsActions";
import "./ItemDetails.scss";

function ItemDetails({match, userDetails})
{
  const [loading, setLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState({});
  
  useEffect(() => {
    if (!loading) setLoading(true);
    const url = process.env.REACT_APP_API_URL + `/gifts/${match.params.id}`
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        console.log(res.data);
        setItemInfo(res.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
      // eslint-disable-next-line
  }, [match.params.id])

  const includeBadges = () => {
    return itemInfo.color
        || itemInfo.size
        || itemInfo.first_name
  }

  return (
    <>
      {loading ? <Loading /> :
        (
          <>
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
                  currUserName={userDetails.first_name} 
                  first_name={itemInfo.first_name}
                />
              </div>
            </main>
          </>
        )
      }
    </>
  )
}

export default ItemDetails;