import { useState, useEffect } from "react";
import axios from "axios";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import "./ItemDetails.scss";

function ItemDetails({match})
{
  const [loading, setLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState({});
  
  useEffect(() => {
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
        console.log(err);
      })
  }, [match.params.id])

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
              <p className="ItemDetails__description">{itemInfo.description}</p>
            </main>
          </>
        )
      }
    </>
  )
}

export default ItemDetails;