import { Link } from "react-router-dom";
import "./ItemCardCreate.scss";

function ItemCardCreate()
{
  return (
    <li className="ItemCardCreate">
      <Link to="/item/new" className="ItemCardCreate__link">
        <div className="ItemCardCreate__card">
            Add a new item
        </div>
      </Link>
    </li>
  )
}

export default ItemCardCreate;