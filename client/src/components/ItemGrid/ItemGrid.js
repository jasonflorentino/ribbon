import ItemCard from "../ItemCard/ItemCard";
import ItemCardCreate from "../ItemCardCreate/ItemCardCreate";
import "./ItemGrid.scss";

function ItemGrid({items, isOwner, userDetails, requestClaimGift})
{
  const first_name = userDetails && userDetails.first_name;
  const uuid = userDetails && userDetails.id;
  const handleClaimSubmit = (itemId) => requestClaimGift(uuid, itemId);

  return (
    <ul className="ItemGrid">
      {isOwner && <ItemCardCreate />}
      {items.map(item => <ItemCard 
        key={`gift${item.id}`} 
        itemData={item} 
        isOwner={isOwner} 
        currentUserFirstName={first_name}
        handleClaimSubmit={handleClaimSubmit} 
      />)}
    </ul>
  )
}

export default ItemGrid;