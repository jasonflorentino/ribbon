import "./InputTextarea.scss";

function InputTextarea({type = "text",
                        className = "",
                        name = "",
                        placeholder = "",
                        value = "",
                        onChange})
{
  return (
    <textarea
      className={`InputTextarea ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    >
    </textarea>
  )
}

export default InputTextarea;