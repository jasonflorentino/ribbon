import { useReducer } from "react";
import InputType from "../InputType/InputType";
import InputTextarea from "../InputTextarea/InputTextarea";
import "./FormEditGift.scss";

function FormEditGift({itemInfo})
{
  const { name, price, size, color, description } = itemInfo;

  const reducer = (state, newState) => ({...state, ...newState});
  const initState = {
    name: name,
    price: price,
    size: size || "",
    color: color || "",
    description: description
  }
  const [formInput, setFormInput] = useReducer(reducer, initState)

  const handleChange = e => {
    const { name, value }  = e.target;
    setFormInput({ [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submit!");
  }

  return (
    <form className="FormEditGift" onSubmit={handleSubmit}>
      <label className="FormEditGift__label" htmlFor="name">Gift Name</label>
      <InputType 
        type="text" 
        className="FormEditGift__inputText"
        name={"name"} 
        value={formInput.name} 
        onChange={handleChange} 
        placeholder="Gift name" 
      />
      <label className="FormEditGift__label" htmlFor="name">Price</label>
      <InputType 
        type="text" 
        className="FormEditGift__inputText FormEditGift__price"
        name={"price"} 
        value={formInput.price} 
        onChange={handleChange} 
        placeholder="Price" 
      />
      <div className="FormEditGift__splitRow">
        <div className="FormEditGift__size">
          <label className="FormEditGift__label" htmlFor="name">Size</label>
          <InputType 
            type="text" 
            className="FormEditGift__inputText"
            name={"size"} 
            value={formInput.size} 
            onChange={handleChange} 
            placeholder="Size" 
          />
        </div>
        <div className="FormEditGift__color">
          <label className="FormEditGift__label" htmlFor="name">Color</label>
          <InputType 
            type="text" 
            className="FormEditGift__inputText"
            name={"color"} 
            value={formInput.color} 
            onChange={handleChange} 
            placeholder="Colour" 
          />
        </div>
      </div>
      <label className="FormEditGift__label" htmlFor="name">Description</label>
      <InputTextarea 
        name="description"
        placeholder="Enter a description"
        value={formInput.description}
        onChange={handleChange}
      />
      <input className="FormEditGift__submit" type="submit" value="Save" />
    </form>
  )
}

export default FormEditGift;