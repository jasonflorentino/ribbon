import FadeIn from "react-fade-in";
import Header from '../../components/Header/Header';

import "./Dashboard.scss";

function Dashboard()
{ 
  return (
    <div className="Dashboard">
      <FadeIn>
        <Header color="positive" logout={true} />
        <main>
          Dashboard
        </main>
      </FadeIn>
    </div>
  )
}

export default Dashboard;