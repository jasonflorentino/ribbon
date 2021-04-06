import { useState, useEffect } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import ImageWithUploadProfile from "../../components/ImageWithUploadProfile/ImageWithUploadProfile";
import FormEditProfile from "../../components/FormEditProfile/FormEditProfile";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import "./UserProfileEdit.scss";

function UserProfileEdit({history, userDetails})
{
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  
  const fetchData = () => {
    if (!loading) setLoading(true);
    const url = process.env.REACT_APP_API_URL + `/user/profile/${userDetails.id}`;
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        setUserData(res.data[0]);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        alert("An error occurred while getting your information")
        history.goBack();
        console.log("UserProfileEdit FetchData():", err);
      })
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return loading ? <Loading /> :
  <FadeIn>
    <header className="UserProfileEdit__header">
      <ButtonBack />
      <MainHeading text={"Edit your profile"} />
    </header>
    <main className="UserProfileEdit__main">
      <ImageWithUploadProfile userId={userDetails.id} initialImage={userData.image} />
      <FormEditProfile userData={userData} userUuid={userDetails.id} history={history} />
    </main>
  </FadeIn>
}

export default UserProfileEdit;