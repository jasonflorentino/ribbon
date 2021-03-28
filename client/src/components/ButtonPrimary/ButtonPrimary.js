import "./ButtonPrimary.scss";

function ButtonPrimary({text, onClick, error, className})
{
  return (
    <button
      className={`ButtonPrimary ${error ? "ButtonPrimary--error" : ""} ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonPrimary;