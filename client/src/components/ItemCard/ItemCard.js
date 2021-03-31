import { Link } from "react-router-dom";
import utils from "../../utils";
import "./ItemCard.scss";

function ItemCard({itemData})
{
  const {name, id, gift_detail: {image, price} = {}} = itemData; 
  return (
    <li className="ItemCard">
      <Link to={`/item/${id}`} className="ItemCard__link">
      <div className="card"> 
        <img className="card__img" src={utils.getPublicUrl(image)} alt={name} />
        <div className="card__content">
          <div className="card__contentRow">
            <h3 className="card__name">{name}</h3>
            <span className="card__price">${price}</span>
          </div>
        </div>
      </div>
      </Link>
    </li>
  )
}

export default ItemCard;