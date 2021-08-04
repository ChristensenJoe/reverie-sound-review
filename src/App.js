import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.js"
import Dashboard from "./components/Dashboard.js"
import News from "./components/News.js";
import Forums from "./components/Forums.js"
import NewsDetails from "./components/NewsDetails.js";
import UserSettings from "./components/UserSettings.js";
import NewForumPost from "./components/NewForumPost.js";

function App() {
  const [user, setUser] = useState(false);
  const [selectedNewsData, setSelectedNewsData] = useState({article: {content: ""}, image: ""});

  function updateUser(newUser) {
    setUser(newUser);
  }

  return (
    <div className="App">
      <Switch>
        <Route
          path='/newsdetails'
          component={() =>
            <NewsDetails
              data={selectedNewsData}
              user={user}
            />}
        />
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
              setSelectedNewsData={setSelectedNewsData}
              user={user}
            />}
        />
        <Route
          path='/newforumpost'
          component={() =>
            <NewForumPost
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
          path='/settings'
          component={() =>
            <UserSettings
              setUser={setUser}
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
