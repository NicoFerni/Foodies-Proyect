import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home'
import CreateRecipe from './components/createRecipe/CreateRecipe'
import Details from './components/detail/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route path = '/home' component={Home}/>
        <Route path = '/createRecipe' component={CreateRecipe}/>
        <Route exact path='/details/:id' component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
