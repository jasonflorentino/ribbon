import { Link } from "react-router-dom";
import "./ItemDetailsActions.scss";

function ItemDetailsActions(
  {
    currUserListId, 
    list_id, 
    currUserName, 
    first_name, 
    external_link, 
    itemId,
    requestClaimSubmit, 
    requestReleaseSubmit
  }
)
{
  const isOwnItem = () => currUserListId === list_id;
  const showClaim = () => !first_name && !isOwnItem();
  const showRelease = () => (currUserName === first_name) && !isOwnItem();
  const showBuy = () => !first_name && !isOwnItem();

  return (
    <div className="ItemDetailsActions">
      {isOwnItem() && 
        <Link to={`/item/${itemId}/edit`} className="ItemDetailsActions__button--edit">
          Edit
        </Link>
      }
      {showClaim() && 
        <button className="ItemDetailsActions__button--claim" onClick={() => requestClaimSubmit(itemId)}>
          I got it!
        </button>
      }
      {showRelease() && 
        <button className="ItemDetailsActions__button--release" onClick={() => requestReleaseSubmit(itemId)}>
          I didn't get it
        </button>
      }
      {showBuy() && 
        <a className="ItemDetailsActions__button--buy" href={external_link} target="_blank" rel="noreferrer">
          Buy
        </a>
      }
    </div>
  )
}

export default ItemDetailsActions;