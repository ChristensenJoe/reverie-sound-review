import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./components/Login.js"
import Dashboard from "./components/Dashboard.js"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/dashboard' component={() => <Dashboard /> }/>
        <Route path='/' component={() => <Login /> }/>
      </Switch>
    </div>
  );
}

export default App;
