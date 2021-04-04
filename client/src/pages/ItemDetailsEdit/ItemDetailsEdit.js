import { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import ImageWithUpload from "../../components/ImageWithUpload/ImageWithUpload";
import FormEditGift from "../../components/FormEditGift/FormEditGift";
import utils from "../../utils";
import "./ItemDetailsEdit.scss";

function ItemDetailsEdit({match, history})
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [match.params.id])

  return loading ? <Loading /> :
    <FadeIn>
      <header className="ItemDetailsEdit__header">
        <ButtonBack />
        <MainHeading text={itemInfo.name} />
      </header>
      <main className="ItemDetailsEdit__main">
        <ImageWithUpload itemId={match.params.id} initialImage={itemInfo.image} />
        <FormEditGift itemInfo={itemInfo} />
      </main>
    </FadeIn>
}

export default ItemDetailsEdit;