import FadeIn from "react-fade-in";
import Header from "../../components/Header/Header";
import DashboardHeader from "./DashboardHeader";
import ConnectionsSideBar from "../../components/ConnectionsSideBar/ConnectionsSideBar";
import ItemGrid from "../../components/ItemGrid/ItemGrid";

import "./Dashboard.scss";

function Dashboard()
{ 
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
            <ItemGrid />
          </section>
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;