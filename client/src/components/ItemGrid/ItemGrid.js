import ItemCard from "../ItemCard/ItemCard";
import ItemCardCreate from "../ItemCardCreate/ItemCardCreate";
import "./ItemGrid.scss";

function ItemGrid({items, owner})
{
  return (
    <ul className="ItemGrid">
      {owner && <ItemCardCreate />}
      {items.map(item => <ItemCard key={`gift${item.id}`} itemData={item} />)}
    </ul>
  )
}

export default ItemGrid;