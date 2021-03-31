import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import utils from "../../utils";
import "./Dashboard.scss";

function Dashboard({userDetails, setIsAuthenticated})
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
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/connections"
    axios
      .get(url, {headers: utils.getAuthHeader()})
      .then(res => {setConnections(res.data)})      
      .catch(err => {console.log(err)})
  }, [])

  return (
    <div className="Dashboard">
      <FadeIn className="Dashboard__fadeContainer">
        <Header color="positive" logout={true} setIsAuthenticated={setIsAuthenticated} />
        <main className="Dashboard__main">
          <section className="main__sidebar">
            <ConnectionsSideBar connections={connections} />
          </section>
          <section className="main__content">
            <Switch>
              <Route path="/" exact>
                <DashboardHeader userImage={userDetails.image} />
                <ItemGrid items={listItems} />
              </Route>
              <Route path="/item/:id">
                <h1>Item details</h1>
              </Route>
            </Switch>
          </section>
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;