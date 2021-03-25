import "./ButtonPrimary.scss";

function ButtonPrimary({text, onClick})
{
  return (
    <button
      className="ButtonPrimary"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonPrimary;