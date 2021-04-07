import { useState, useReducer } from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import Loading from "../../components/Loading/Loading";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import InputImage from "../../components/InputImage/InputImage";
import InputNewGift from "../../components/InputNewGift/InputNewGift";
import utils from "../../utils";
import "./ItemNew.scss";

function ItemNew({history, userDetails, setRequireUpdate})
{
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------
   * IMAGE INPUT
   * ------------------------------------------------------------ */

  const [imageSrc, setImageSrc] = useState(utils.getPublicUrl("placeholder.png")); 
  const [file, setFile] = useState(""); 
  const [filename, setFilename] = useState("Choose File"); 

  const onFileSelect = e => {
    const file = e.target.files[0];

    // NOTE: verifyImageFile() will call alerts on error
    if (utils.verifyImageFile(file)) { 
      setFile(file);
      setFilename(file.name);
      const reader = new FileReader()
      reader.addEventListener("loadend", function() {
        setImageSrc(this.result);
      }, false);
      reader.readAsDataURL(file);
      return;
    }
    else {
      setFile("");
      setFilename("Choose File");
      return;
    }
  }

  /* ------------------------------------------------------------
   * TEXT INPUT
   * ------------------------------------------------------------ */

  const reducer = (state, newState) => ({...state, ...newState});
  const initState = {
    name: "",
    nameError: false,
    nameErrorMsg: "",
    price: "",
    priceError: false,
    priceErrorMsg: "",
    size: "",
    sizeError: false,
    sizeErrorMsg: "",
    color:  "",
    colorError: false,
    colorErrorMsg: "",
    description: "",
    descriptionError: false,
    descriptionErrorMsg: "",
    externalLink: "",
    externalLinkError: false,
    externalLinkErrorMsg: "",
  }
  const [formInput, setFormInput] = useReducer(reducer, initState)
  const [showSizeColor, setShowSizeColor] = useState(false);

  const handleChange = e => {
    const { name, value }  = e.target;
    setFormInput({ 
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  /* ------------------------------------------------------------
   * SUBMIT HANDLER
   * ------------------------------------------------------------ */

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!file) return alert("You need to choose a file!");
    if (!formInput.name) return setFormInput({nameError: true, nameErrorMsg: "You must provide a name"});
    if (!formInput.price) return setFormInput({priceError: true, priceErrorMsg: "You must provide a price"});
    if (isNaN(formInput.price)) return setFormInput({priceError: true, priceErrorMsg: "Please enter a number"});
    if (!formInput.externalLink) return setFormInput({externalLinkError: true, externalLinkErrorMsg: "You must provide a link"});
    if (!showSizeColor) setFormInput({size: "", color: ""});

    setLoading(true);

    const listId = userDetails.list_id;
    const url = process.env.REACT_APP_API_URL + `/gifts/new`;
    const itemDetails = {
      list_id: listId,
      name: formInput.name,
      price: formInput.price,
      size: formInput.size,
      color: formInput.color,
      description: formInput.description,
      external_link: formInput.externalLink,
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemDetails", JSON.stringify(itemDetails));
    
    axios
      .post(url, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          ...utils.getAuthHeader()
        }
      })
      .then(() => {
        setRequireUpdate(true);
        history.push(`/`);
      })
      .catch(err => {
        alert("An error occurred while trying to create the gift.");
        console.error("ItemNew - handleSubmit():", err);
        setLoading(false)
      })
  }

  /* ------------------------------------------------------------
   * RETURN JSX
   * ------------------------------------------------------------ */

  return loading ? <Loading /> :
    <FadeIn>
      <header className="ItemNew__header">
        <ButtonBack />
        <MainHeading text={"Add a new gift"} />
      </header>
      <form className="ItemNew__main" onSubmit={handleSubmit}>
        <InputImage 
          onFileSelect={onFileSelect} 
          imageSrc={imageSrc} 
          filename={filename}
        />
        <InputNewGift 
          image={file} 
          formInput={formInput} 
          handleChange={handleChange}
          setShowSizeColor={setShowSizeColor}
          showSizeColor={showSizeColor} 
        />
      </form>
    </FadeIn>
}

export default ItemNew;