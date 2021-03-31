import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import List from "./pages/List/List";
import SignUp from "./pages/SignUp/SignUp";
import "./styles/App.scss";
import axios from "axios";

function App()
{
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return setIsLoading(false);
    const url = process.env.REACT_APP_API_URL + "/check-auth";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUserDetails({
            id: res.data.user,
            image: res.data.image 
          });
          setIsLoading(false);
        } else {
          throw new Error("Bad response");
        }
      })
      .catch(err => {
        console.log("Mount Error:", err.message);
        setIsLoading(false);
        setIsAuthenticated(false);
      })
  }, [isAuthenticated])

  return (
    isLoading 
    ? <div className="App"><Loading /></div>
    : (<div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => {
              if (isAuthenticated) {
                return <Dashboard {...props} isAuthenticated={isAuthenticated} userDetails={userDetails} />
              }
              return <Home {...props} />
              }} 
            />
            <Route path="/login" render={(props) => {
              return <Login {...props} setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading} />}}  
            />
            <Route path="/signup" render={(props) => {
              return <SignUp {...props} setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading} />}}  
            />
            <Route path="/user/:userUuid/list/:listId" render={(props) => {
              return <List {...props} isAuthenticated={isAuthenticated} />}}  
            />
          </Switch>
        </BrowserRouter>
      </div>)
  );
}

export default App;
