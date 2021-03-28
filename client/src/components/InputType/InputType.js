import InputError from '../InputError/InputError';
import "./InputType.scss";

function InputType({type,name, value, onChange, placeholder, error, errorMsg})
{
  return (
    <>
      <input
        type={type}
        className={`InputType ${error ? "InputType--error" : ""}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      {error && <InputError text={errorMsg} />}
    </>
  )
}

export default InputType;