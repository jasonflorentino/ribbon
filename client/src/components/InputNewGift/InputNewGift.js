import InputType from "../InputType/InputType";
import InputTextarea from "../InputTextarea/InputTextarea";
import "./InputNewGift.scss";

function InputNewGift({formInput, showSizeColor, handleChange, setShowSizeColor})
{
  return (
    <div className="InputNewGift">
      <label className="InputNewGift__label" htmlFor="name">Gift Name</label>
      <InputType 
        type="text" 
        className="InputNewGift__inputText"
        name={"name"} 
        value={formInput.name} 
        onChange={handleChange} 
        placeholder="Gift name" 
        error={formInput.nameError}
        errorMsg={formInput.nameErrorMsg}
      />
      <label className="InputNewGift__label" htmlFor="name">Price</label>
      <InputType 
        type="text" 
        className="InputNewGift__inputText InputNewGift__price"
        name={"price"} 
        value={formInput.price} 
        onChange={handleChange} 
        placeholder="Price"
        error={formInput.priceError}
        errorMsg={formInput.priceErrorMsg} 
      />
      <div className="InputNewGift__splitRow">
      {showSizeColor && (
      <>
        <div className="InputNewGift__size">
          <label className="InputNewGift__label" htmlFor="name">Size</label>
          <InputType 
            type="text" 
            className="InputNewGift__inputText"
            name={"size"} 
            value={formInput.size} 
            onChange={handleChange} 
            placeholder="Size" 
          />
        </div>
        <div className="InputNewGift__color">
          <label className="InputNewGift__label" htmlFor="name">Color</label>
          <InputType 
            type="text" 
            className="InputNewGift__inputText"
            name={"color"} 
            value={formInput.color} 
            onChange={handleChange} 
            placeholder="Colour" 
          />
        </div>
      </>)}
      </div>
      <label className="InputNewGift__label" htmlFor="name">Description</label>
      <InputTextarea 
        name="description"
        placeholder="Enter a description"
        value={formInput.description}
        onChange={handleChange}
      />
      <label className="InputNewGift__label" htmlFor="name">Link to purchase</label>
      <InputType 
        type="text" 
        className="InputNewGift__inputText"
        name={"externalLink"} 
        value={formInput.externalLink} 
        onChange={handleChange} 
        placeholder="Paste a link to purchase" 
        error={formInput.externalLinkError}
        errorMsg={formInput.externalLinkErrorMsg} 
      />
      <div className="InputNewGift__actions">
        <button 
          type="button" 
          className={`InputNewGift__button${showSizeColor ? "--active" : ""}`} 
          onClick={() => setShowSizeColor(!showSizeColor)}
        >
          {!showSizeColor ? "Add Size or Color" : "Hide Size and Color"}
        </button>
        <input className="InputNewGift__submit" type="submit" value="Create" />
      </div>
    </div>
  )
}

export default InputNewGift;