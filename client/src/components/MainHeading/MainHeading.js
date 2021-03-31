import "./MainHeading.scss";

function MainHeading({text, price}) {
  return (
    <h1 className="MainHeading">
      {text}
      {price && <span className="MainHeading__price">${price}</span>}
    </h1>
  )
}

export default MainHeading;