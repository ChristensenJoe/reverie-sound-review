import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.js"
import Dashboard from "./components/Dashboard.js"
import News from "./components/News.js";
import Forums from "./components/Forums.js"

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
          path='/news'
          component={() =>
            <News
              user={user}
            />}
        />
        <Route
          path='/forums'
          component={() =>
            <Forums
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
