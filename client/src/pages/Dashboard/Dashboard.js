import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import ItemDetails from "../ItemDetails/ItemDetails";
import UserList from "../UserList/UserList";
import utils from "../../utils";
import "./Dashboard.scss";

function Dashboard({userDetails, setIsAuthenticated, location})
{ 
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/list"
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {setListItems(res.data)})
      .catch(err => {console.log(err)})
  }, [])

  const [connections, setConnections] = useState([]);
  const [allConnections, setAllConnections] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/connections"
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {
        setConnections(res.data)
        setAllConnections(res.data);
      })      
      .catch(err => {console.log(err)})
  }, [])

  return (
    <div className="Dashboard">
      <FadeIn className="Dashboard__fadeContainer">
        <Header color="positive" logout={true} setIsAuthenticated={setIsAuthenticated} />
        <main className="Dashboard__main">
          <section className="main__sidebar">
            <ConnectionsSideBar 
              connections={connections} 
              location={location} 
              userDetails={userDetails}
            />
          </section>
          <section className="main__content">
            <Switch>
              <Route path="/" exact render={_props => {
                setConnections(allConnections);
                return (
                  <>
                    <DashboardHeader userImage={userDetails.image} />
                    <ItemGrid items={listItems} owner={true} />
                  </>
                )
              }} />
              <Route path="/item/:id" render={props => {
                return <ItemDetails {...props} />
              }}/>
              <Route path="/user/:id" render={props => {
                return <UserList 
                  {...props} 
                  setConnections={setConnections}
                  allConnections={allConnections}
                  setAllConnections={setAllConnections}
                />
              }}/>
            </Switch>
          </section>
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;