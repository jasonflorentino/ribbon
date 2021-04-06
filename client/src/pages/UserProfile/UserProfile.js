import { useState, useEffect } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import UserImage from "../../components/UserImage/UserImage";
import MainHeading from "../../components/MainHeading/MainHeading";
import Loading from "../../components/Loading/Loading";
import utils from "../../utils";
import "./UserProfile.scss";

function UserProfile({history, match, userDetails})
{
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  
  const fetchData = () => {
    if (!loading) setLoading(true);
    const url = process.env.REACT_APP_API_URL + `/user/profile/${id}`;
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
        console.log("UserProfile FetchData():", err);
      })
  }

  const showEdit = () => {
    return id === userDetails.id;
  }

  const handleEditClick = () => {
    history.push("/user/profile/edit");
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id])

  const birthDate = new Date(userData.date_of_birth);
  const birthdayString = utils.makeDateString(birthDate);
  const timeUntilBirthday = utils.makeCountdownString(birthDate);
  return loading ? 
  <Loading />  :
  <FadeIn>
    <header className="UserProfile__header">
      <ButtonBack />
      <MainHeading text={`${userData.first_name} ${userData.last_name}`} />
    </header>
    <main className="UserProfile__main">
    <UserImage 
        role="hero" 
        imgSrc={utils.getPublicUrl(userData.image)} 
        altText="User image" 
      />
      <div className="UserProfile__textContainer">
        <h5 className="UserProfile__label">Birthday</h5>
        <p className="UserProfile__text">
          {birthdayString}
          <span className="UserProfile__countdown">{timeUntilBirthday}</span>
        </p>
        <h5 className="UserProfile__label">Interests</h5>
        <p className="UserProfile__text">{userData.interests}</p>
        <h5 className="UserProfile__label">Allergies</h5>
        <p className="UserProfile__text">{userData.allergies}</p>
        <h5 className="UserProfile__label">Sizes</h5>
        <p className="UserProfile__text">{userData.sizes}</p>
        {showEdit() && <button className="UserProfile__edit" onClick={handleEditClick}>Edit</button>}
      </div>
    </main>
  </FadeIn>
}

export default UserProfile;