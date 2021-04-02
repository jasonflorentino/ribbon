import { Link } from "react-router-dom";
import utils from "../../utils";
import "./ItemCard.scss";

function ItemCard({itemData, isOwner, currentUserFirstName, handleClaimSubmit})
{
  const {name, id, image, price, external_link, status, gifted_by, first_name} = itemData; 
  const getGifterName = () => first_name === currentUserFirstName ? "you" : first_name;
  const showBuyLinks = () => (!isOwner && status === "available");

  return (
    <li className={`ItemCard`}>
      <div className={`card${!isOwner && status !== "available" ?  "--claimed" : ""}`}>
        {gifted_by && 
          <div className="card__giftedBy">
            {`Gifted by ${getGifterName()}`}
          </div>
        }
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
            {showBuyLinks() && 
              <button className="card__button--secondary" onClick={() => handleClaimSubmit(id)}>
                I got it!
              </button>
            }
            {showBuyLinks() && 
              <a href={external_link} className="card__button" target="_blank" rel="noreferrer">
                Buy
              </a>
            }
          </div>
        </div>
      </div>
    </li>
  )
}

export default ItemCard;