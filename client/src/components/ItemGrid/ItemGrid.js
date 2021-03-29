import ItemCard from "../ItemCard/ItemCard";
import ItemCardCreate from "../ItemCardCreate/ItemCardCreate";
import "./ItemGrid.scss";

function ItemGrid() {
  return (
    <ul className="ItemGrid">
      <ItemCardCreate />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </ul>
  )
}

export default ItemGrid;