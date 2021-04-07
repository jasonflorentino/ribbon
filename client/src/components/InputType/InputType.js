import InputError from '../InputError/InputError';
import "./InputType.scss";

function InputType({type,
                    className, 
                    name, 
                    value, 
                    onChange, 
                    placeholder, 
                    error, 
                    errorMsg})
{
  return (
    <>
      <input
        type={type}
        className={`InputType ${error ? "InputType--error" : ""} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        maxLength="255"
      />
      {error && <InputError text={errorMsg} />}
    </>
  )
}

export default InputType;