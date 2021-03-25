import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import List from './pages/List/List';
import './styles/App.scss';

function App()
{
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => {
              return <Home {...props} />}} 
            />
            <Route path="/login/" render={(props) => {
              return <Login {...props} />}}  
            />
            <Route path="/user/:userUuid/list/:listId" render={(props) => {
              return <List {...props} />}}  
            />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
