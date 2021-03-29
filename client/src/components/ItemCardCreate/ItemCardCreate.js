import { Link } from "react-router-dom";
import "./ItemCardCreate.scss";

function ItemCardCreate() {
  return (
    <li className="ItemCardCreate">
      <div className="ItemCardCreate__card">
        <Link to="/" className="ItemCardCreate__link">
          Add a new item
        </Link>
      </div>
    </li>
  )
}

export default ItemCardCreate;