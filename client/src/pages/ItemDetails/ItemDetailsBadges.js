import "./ItemDetailsBadges.scss";

function ItemDetailsBadges({currUserListId, currUserName, list_id, color, size, first_name})
{
  const showGifter = () => {
    return currUserListId !== list_id && first_name;
  }

  const getName = () => {
    if (currUserName === first_name) return "you"
    return first_name;
  }

  return (
    <div className="ItemDetailsBadges">
      {size && <span className="ItemDetailsBadges__badge--size">Size: {size}</span>}
      {color && <span className="ItemDetailsBadges__badge--color">Colour: {color}</span>}
      {showGifter() && <span className="ItemDetailsBadges__badge--giftedBy">Gifted by {getName()}</span>}
    </div>
  )
}

export default ItemDetailsBadges;