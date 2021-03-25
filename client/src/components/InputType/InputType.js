import "./InputType.scss";

function InputType({type, name, value, onChange, placeholder})
{
  return (
    <input
      type={type}
      className="InputType"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autocomplete="off"
    />
  )
}

export default InputType;