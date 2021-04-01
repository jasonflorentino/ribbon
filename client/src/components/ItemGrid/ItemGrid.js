import ItemCard from "../ItemCard/ItemCard";
import ItemCardCreate from "../ItemCardCreate/ItemCardCreate";
import "./ItemGrid.scss";

function ItemGrid({items, owner, userDetails})
{
  const first_name = userDetails && userDetails.first_name;

  return (
    <ul className="ItemGrid">
      {owner && <ItemCardCreate />}
      {items.map(item => <ItemCard 
        key={`gift${item.id}`} 
        itemData={item} 
        owner={owner} 
        currentUserFirstName={first_name} 
      />)}
    </ul>
  )
}

export default ItemGrid;