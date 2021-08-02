import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./components/Login"
import Header from "./components/Header"


function App() {
  return (
    <div className="App">
     <Header />
      <Switch>
        <Route to='/' component={() => <Login /> }/>
      </Switch>
    </div>
  );
}

export default App;
