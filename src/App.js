import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.js"
import Dashboard from "./components/Dashboard.js"

function App() {
  const [user, setUser] = useState(null);

  function updateUser(newUser) {
    setUser(newUser);
  }

  return (
    <div className="App">
      <Switch>
        <Route
          path='/dashboard'
          component={() =>
            <Dashboard
              user={user}
            />}
        />
        <Route
          path='/'
          component={() =>
            <Login
              updateUser={updateUser}
            />}
        />
      </Switch>
    </div>
  );
}

export default App;
