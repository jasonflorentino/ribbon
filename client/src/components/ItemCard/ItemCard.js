import { Link } from "react-router-dom";
import utils from "../../utils";
import "./ItemCard.scss";

function ItemCard({itemData, owner, currentUserFirstName})
{
  const {name, id, image, price, external_link, status, gifted_by, first_name} = itemData; 

  const showBuyLinks = (owner, status) => {
    return (!owner && status === "available");
  }

  const getGifterName = () => {
    return first_name === currentUserFirstName ? "you" : first_name;
  }

  return (
    <li className={`ItemCard`}>
      <div className={`card${!owner && status !== "available" ?  "--claimed" : ""}`}>
        {gifted_by && <div className="card__giftedBy">{`Gifted by ${getGifterName()}`}</div>}
        <Link to={`/item/${id}`} className="ItemCard__link">
          <img className="card__img" src={utils.getPublicUrl(image)} alt={name} />
        </Link>
        <div className="card__content">
          <div className="card__contentRow">
            <Link to={`/item/${id}`} className="ItemCard__link">
              <h3 className="card__name">{name}</h3>
            </Link>
            <span className="card__price">${price}</span>
          </div>
          <div className="card__contentRow--bottom">
            {showBuyLinks(owner, status) && <button className="card__button--secondary">I got it!</button>}
            {showBuyLinks(owner, status) && <a href={external_link} className="card__button" target="_blank" rel="noreferrer">Buy</a>}
          </div>
        </div>
      </div>
    </li>
  )
}

export default ItemCard;