import { useState } from "react";

// Material UI imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

// import axios from "axios";
import FormSignUp from '../../components/FormSignUp/FormSignUp';
import "./SignUp.scss";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: "0.75rem",
    "border-radius": "1rem",
  },
  button: {
    "border-radius": "2rem",
    fontWeight: 700
  }
}));

function SignUp({setIsAuthenticated, history, setIsLoading})
{ 
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Material UI Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoginPush = () => history.push("/login");
  const classes = useStyles();

  const requestSignUp = (email, password) => {
    setErrorMessage("")
    handleClickOpen();
    return;
  
    // const url = process.env.REACT_APP_API_URL + "/signup";
    // axios
    //   .post(url, {
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     sessionStorage.setItem("authToken", res.data.token);
    //     setIsSignUpError(false);
    //     setIsLoading(true);
    //     setIsAuthenticated(true);
    //   })
    //   .then(() => {
    //     history.push("/");
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.response.data.message);
    //     setIsSignUpError(true);
    //     return;
    //   });
  }

  return (
    <>
      <FormSignUp 
        requestSignUp={requestSignUp}
        isSignUpError={isSignUpError}
        setIsSignUpError={setIsSignUpError}
        errorMessage={errorMessage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paperScrollPaper: classes.dialog,
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Yeah, about that..."}</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <Typography>Sorry! I've turned off Signup for now.</Typography> 
            <Typography>—Jason</Typography> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            className={classes.button} 
            onClick={handleClose} 
            color="secondary" 
            autoFocus
          >
            Close
          </Button>
          <Button 
            className={classes.button} 
            onClick={handleLoginPush} 
            variant="contained" 
            color="secondary" 
            autoFocus
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp;