import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./components/Login.js"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard.js"

function App() {
  return (
    <div className="App">
     <Header />
      <Switch>
        <Route to='/' component={() => <Login /> }/>
        <Route to='/dashboard' component={() => <Dashboard /> }/>
      </Switch>
    </div>
  );
}

export default App;
