import RibbonIcon from "../../assets/ribbon-icon-positive.svg";
import "./Loading.scss";

function Loading() {
  return (
    <div className="Loading">
      <img className="Loading__icon" src={RibbonIcon} alt="Ribbon Icon" />
    </div>
  )
}

export default Loading;