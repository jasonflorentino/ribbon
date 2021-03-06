import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import Loading from "../../components/Loading/Loading";
import ItemDetails from "../ItemDetails/ItemDetails";
import ItemDetailsEdit from "../ItemDetailsEdit/ItemDetailsEdit";
import ItemNew from "../ItemNew/ItemNew";
import UserList from "../UserList/UserList";
import UserProfile from "../UserProfile/UserProfile";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";
import utils from "../../utils";
import "./Dashboard.scss";

function Dashboard({userDetails, setIsAuthenticated})
{ 
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [connections, setConnections] = useState([]);
  const [requireUpdate, setRequireUpdate] = useState(true);

  useEffect(() => {
    if (!requireUpdate) return;
    
    setLoading(true);
    const listUrl = process.env.REACT_APP_API_URL + "/list"
    const connectsUrl = process.env.REACT_APP_API_URL + "/connections"
    
    axios.all([
      axios.get(listUrl, {headers: utils.getAuthHeader()}),
      axios.get(connectsUrl, {headers: utils.getAuthHeader()})
    ])
    .then(axios.spread((listRes, connectsRes) => {
      setListItems(listRes.data);
      setConnections(connectsRes.data);
    }))
    .catch(err => {
      console.log(err);
      setRequireUpdate(false);
      setLoading(false);
    })
  }, [requireUpdate])

  useEffect(() => {
    if (listItems.length
      && connections.length
      && loading
      && requireUpdate) {
      setRequireUpdate(false);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [listItems, connections])

  return loading || !userDetails ? <Loading /> :
    (
      <div className="Dashboard">
        <FadeIn className="Dashboard__fadeContainer">
          <Header color="positive" logout={true} setIsAuthenticated={setIsAuthenticated} />
          <main className="Dashboard__main">
            <section className="main__sidebar">
              <ConnectionsSideBar 
                connections={connections} 
                userDetails={userDetails}
              />
            </section>
            <section className="main__content">
              <Switch>
                <Route path="/" exact render={_props => (
                  <FadeIn>
                    <DashboardHeader userDetails={userDetails} />
                    <ItemGrid items={listItems} isOwner={true} />
                  </FadeIn>
                )} />
                <Route path="/item/new" render={props => (
                  <ItemNew {...props} userDetails={userDetails} setRequireUpdate={setRequireUpdate} />
                )} />
                <Route path="/item/:id/edit" render={props => (
                  <ItemDetailsEdit {...props} setRequireUpdate={setRequireUpdate} />
                )} />
                <Route path="/item/:id" render={props => (
                  <ItemDetails {...props} userDetails={userDetails} />
                )} />
                <Route path="/user/profile/edit" render={props => (
                  <UserProfileEdit {...props} userDetails={userDetails} />
                )} />
                <Route path="/user/profile/:id" render={props => (
                  <UserProfile {...props} userDetails={userDetails} />
                )} />
                <Route path="/user/:id" render={props => (
                  <UserList 
                    {...props} 
                    userDetails={userDetails}
                    setRequireUpdate={setRequireUpdate}
                  />
                )} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </section>
          </main>
        </FadeIn>
      </div>
    )
}

export default Dashboard;