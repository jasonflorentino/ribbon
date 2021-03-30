import ItemCard from "../ItemCard/ItemCard";
import ItemCardCreate from "../ItemCardCreate/ItemCardCreate";
import "./ItemGrid.scss";

function ItemGrid({items})
{
  return (
    <ul className="ItemGrid">
      <ItemCardCreate />
      {items.map(item => <ItemCard key={`gift${item.id}`} itemData={item} />)}
    </ul>
  )
}

export default ItemGrid;