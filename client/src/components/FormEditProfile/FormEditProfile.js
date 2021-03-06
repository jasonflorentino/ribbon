import { useReducer } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from '@date-io/dayjs';

import InputType from "../InputType/InputType";
import "./FormEditProfile.scss";
import axios from "axios";
import utils from "../../utils";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    backgroundColor: "#fcf6e6",
    padding: ".5rem 1.5rem",
    color: "#313133",
    "border-radius": "2rem",
    "margin-top": ".5rem",
    "margin-bottom": ".5rem",
    "font-family": "'filson-pro', Avenir, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    "font-weight": 800
  },
}));

function FormEditProfile({userData, userUuid})
{
  const classes = useStyles();
  const {
    first_name = "", 
    last_name = "", 
    date_of_birth = new Date(), 
    interests = "", 
    allergies = "", 
    sizes = "" 
  } = userData;

  const reducer = (state, newState) => ({...state, ...newState});
  const initState = {
    first_name: first_name,
    first_nameError: false,
    first_nameErrorMsg: "",
    last_name: last_name,
    last_nameError: false,
    last_nameErrorMsg: "",
    date_of_birth: utils.getYYYYMMDDStringFromDate(new Date(date_of_birth)),
    date_of_birthError: false,
    date_of_birthErrorMsg: "",
    interests: interests,
    interestsError: false,
    interestsErrorMsg: "",
    allergies: allergies,
    allergiesError: false,
    allergiesErrorMsg: "",
    sizes: sizes,
    sizesError: false,
    sizesErrorMsg: "",
  }
  const [formInput, setFormInput] = useReducer(reducer, initState)

  const handleChange = e => {
    if (e.target) {
      const { name, value }  = e.target;
      setFormInput({ 
        [name]: value,
        [`${name}Error`]: false,
      });
    }
    // Handle Material UI date change
    else {
      setFormInput({ 
        date_of_birth: e.format('YYYY-MM-DD'),
        date_of_birthError: false,
      });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!formInput.first_name) return setFormInput({first_name: true, first_nameErrorMsg: "Please enter your first name"});
    if (!formInput.last_name) return setFormInput({last_nameError: true, last_nameErrorMsg: "Please enter your last name"});

    const url = process.env.REACT_APP_API_URL + `/user/${userUuid}`;
    const data = {
      uuid: userUuid,
      first_name: formInput.first_name,
      last_name: formInput.last_name,
      date_of_birth: formInput.date_of_birth,
      interests: formInput.interests,
      allergies: formInput.allergies,
      sizes: formInput.sizes,
    }
    
    axios
      .put(url, data, {headers: utils.getAuthHeader()})
      .then(() => {
        alert("Update successful!");
        window.location.reload();
      })
      .catch(err => {
        alert("An error occurred while trying to update your information.");
        console.error("FormEditProfile - handleSubmit():", err);
      })
  }

  const maxDate = () => {
    const minAge = 14;
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setFullYear(now.getFullYear() - minAge);
    const offsetDate = new Date(now.getTime() - (offset*60*1000));
    return offsetDate.toISOString().split("T")[0];
  }

  return (
    <form className="FormEditProfile" onSubmit={handleSubmit}>
      <div className="FormEditProfile__splitRow">
        <div className="FormEditProfile__size">
          <label className="FormEditProfile__label" htmlFor="first_name">First Name</label>
          <InputType 
            type="text" 
            className="FormEditProfile__inputText"
            name={"first_name"} 
            value={formInput.first_name} 
            onChange={handleChange} 
            placeholder="First Name" 
            error={formInput.first_nameError}
            errorMsg={formInput.first_nameErrorMsg}
          />
        </div>
        <div className="FormEditProfile__color">
          <label className="FormEditProfile__label" htmlFor="last_name">Last Name</label>
          <InputType 
            type="text" 
            className="FormEditProfile__inputText"
            name={"last_name"} 
            value={formInput.last_name} 
            onChange={handleChange} 
            placeholder="Last Name"
            error={formInput.last_nameError}
            errorMsg={formInput.last_nameErrorMsg} 
          />
        </div>
      </div>
      <label className="FormEditProfile__label" htmlFor="date_of_birth">Birthday</label>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <DatePicker
          className={classes.datePicker}
          disableFuture
          openTo="year"
          format="YYYY/MM/DD"
          views={["year", "month", "date"]}
          name={"date_of_birth"}
          value={formInput.date_of_birth}
          onChange={handleChange}
          maxDate={maxDate()}
        />
      </MuiPickersUtilsProvider>
      <label className="FormEditProfile__label" htmlFor="interests">Interests</label>
      <InputType 
        type="text" 
        className="FormEditProfile__inputText"
        name={"interests"} 
        value={formInput.interests} 
        onChange={handleChange} 
        placeholder="Interests"
        error={formInput.interestsError}
        errorMsg={formInput.interestsErrorMsg} 
      />
      <label className="FormEditProfile__label" htmlFor="allergies">Allergies</label>
      <InputType 
        type="text" 
        className="FormEditProfile__inputText"
        name={"allergies"} 
        value={formInput.allergies} 
        onChange={handleChange} 
        placeholder="Allergies"
        error={formInput.allergiesError}
        errorMsg={formInput.allergiesErrorMsg} 
      />
      <label className="FormEditProfile__label" htmlFor="sizes">Sizes</label>
      <InputType 
        type="text" 
        className="FormEditProfile__inputText"
        name={"sizes"} 
        value={formInput.sizes} 
        onChange={handleChange} 
        placeholder="Sizes"
        error={formInput.sizesError}
        errorMsg={formInput.sizesErrorMsg} 
      />
      <input className="FormEditProfile__submit" type="submit" value="Save" />
    </form>
  )
}

export default FormEditProfile;