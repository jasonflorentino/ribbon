import { useState, useEffect } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import utils from "../../utils";
import "./Dashboard.scss";

function Dashboard({userDetails})
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
        <Header color="positive" logout={true} />
        <main className="Dashboard__main">
          <section className="main__sidebar">
            <ConnectionsSideBar connections={connections} />
          </section>
          <section className="main__content">
            <DashboardHeader userImage={userDetails.image} />
            <ItemGrid items={listItems} />
          </section>
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;