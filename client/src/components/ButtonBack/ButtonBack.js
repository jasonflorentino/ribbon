import { withRouter } from "react-router-dom";
import utils from "../../utils";
import "./ButtonBack.scss";

function ButtonBack({history})
{
  return (
    <button className="ButtonBack" onClick={() => history.goBack()}>
      <img src={utils.getPublicUrl("icon-back.svg")} className="ButtonBack__arrow" alt="Back" />
    </button>
  )
}

export default withRouter(ButtonBack);