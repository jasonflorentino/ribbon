import "./ButtonPrimary.scss";

function ButtonPrimary({text, onClick, className})
{
  return (
    <button
      className={`ButtonPrimary ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonPrimary;