import { useReducer } from "react";
import InputType from "../InputType/InputType";
import InputTextarea from "../InputTextarea/InputTextarea";
import "./FormEditGift.scss";
import axios from "axios";
import utils from "../../utils";

function FormEditGift({itemInfo, history, setRequireUpdate})
{
  const { name, price, size, color, description } = itemInfo;

  const reducer = (state, newState) => ({...state, ...newState});
  const initState = {
    name: name,
    nameError: false,
    nameErrorMsg: "",
    price: price,
    priceError: false,
    priceErrorMsg: "",
    size: size || "",
    sizeError: false,
    sizeErrorMsg: "",
    color: color || "",
    colorError: false,
    colorErrorMsg: "",
    description: description,
    descriptionError: false,
    descriptionErrorMsg: "",
  }
  const [formInput, setFormInput] = useReducer(reducer, initState)

  const handleChange = e => {
    const { name, value }  = e.target;
    setFormInput({ 
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!formInput.name) {
      setFormInput({ 
        nameError: true,
        nameErrorMsg: "You must provide a name",
      });
      return;
    }

    if (!formInput.price) {
      setFormInput({ 
        priceError: true,
        priceErrorMsg: "You must provide a price",
      });
      return;
    }

    const id = itemInfo.id;
    const url = process.env.REACT_APP_API_URL + `/gifts/${id}/edit`;
    const itemDetails = {
      gift_id: id,
      name: formInput.name,
      price: formInput.price,
      size: formInput.size,
      color: formInput.color,
      description: formInput.description,
    }
    
    axios
      .put(url, itemDetails, {headers: utils.getAuthHeader()})
      .then(() => {
        setRequireUpdate(true);
        history.push(`/item/${id}`);
      })
      .catch(err => {
        alert("An error occurred while trying to upload the file.");
        console.error("FormEditGift - handleSubmit():", err);
      })
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
        error={formInput.nameError}
        errorMsg={formInput.nameErrorMsg}
      />
      <label className="FormEditGift__label" htmlFor="name">Price</label>
      <InputType 
        type="text" 
        className="FormEditGift__inputText FormEditGift__price"
        name={"price"} 
        value={formInput.price} 
        onChange={handleChange} 
        placeholder="Price"
        error={formInput.priceError}
        errorMsg={formInput.priceErrorMsg} 
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