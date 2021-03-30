import { useState, useEffect } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import utils from "../../utils";
import "./Dashboard.scss";

function Dashboard()
{ 
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/list"
    axios
      .get(url, {
        headers: { ...utils.getAuthHeader() }
      })
      .then(res => {
        setListItems(res.data);
      })
  }, [])

  return (
    <div className="Dashboard">
      <FadeIn className="Dashboard__fadeContainer">
        <Header color="positive" logout={true} />
        <main className="Dashboard__main">
          <section className="main__sidebar">
            <ConnectionsSideBar />
          </section>
          <section className="main__content">
            <DashboardHeader />
            <ItemGrid items={listItems} />
          </section>
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;