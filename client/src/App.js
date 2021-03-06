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

  const checkAuth = () => {
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
        return new Promise((resolve, reject) => {
          if (res.status === 200) {
            setIsAuthenticated(true);
            setUserDetails({
              id: res.data.user,
              first_name: res.data.first_name,
              image: res.data.image,
              list_id: res.data.list_id
            });
            resolve();
          } else {
            reject(new Error("Bad response"));
          }
        })
      }).then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsAuthenticated(false);
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }
      })
  }
  
  useEffect(() => {
    checkAuth();
  }, [isAuthenticated])

  const getHomepage = (props) => {
    if (isAuthenticated) return (
      <Dashboard 
        {...props} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        userDetails={userDetails} 
      />
    )
    
    else return (
      <Home 
        setIsAuthenticated={setIsAuthenticated} 
        setIsLoading={setIsLoading} 
      />
    )
  }

  return (
    <div className="App">
      { isLoading ? (
        <Loading />
       ) : (
        <BrowserRouter>
          <Switch>
            <Route path="/" render={getHomepage} />
          </Switch>
        </BrowserRouter>
      ) }
    </div>
  );
}

export default App;
