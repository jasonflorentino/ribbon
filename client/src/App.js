import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
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
        } else {
          throw new Error("Bad response");
        }
      }).then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Mount Error:", err.message);
        setIsLoading(false);
        setIsAuthenticated(false);
      })
  }, [isAuthenticated])

  return (
    <div className="App">
      {isLoading ? <Loading /> :
        (<BrowserRouter>
          <Switch>
            <Route path="/" render={(props) => {
              if (isAuthenticated) 
              {
                return <Dashboard 
                  {...props} 
                  isAuthenticated={isAuthenticated} 
                  setIsAuthenticated={setIsAuthenticated} 
                  userDetails={userDetails} 
                />
              } 
              else 
              {
                return <Home 
                  setIsAuthenticated={setIsAuthenticated} 
                  setIsLoading={setIsLoading} 
                />
              }
              }} 
            />
          </Switch>
        </BrowserRouter>)
      }
    </div>
  );
}

export default App;
