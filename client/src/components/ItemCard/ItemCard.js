import "./ItemCard.scss";

const imgUrl = "https://cdn.shopify.com/s/files/1/0053/4980/2056/products/0N5A1560_bc783b9e-b2c2-4d88-9bfa-314ff065fdd1_540x.jpg?v=1574373965"

function ItemCard() {
  return (
    <li className="ItemCard">
      <div className="card"> 
        <img className="card__img" src={imgUrl} alt="item" />
        <div className="card__content">
          <div className="card__contentRow">
            <h3 className="card__name">Item Name one two three four five</h3>
            <span className="card__price">$29</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ItemCard;