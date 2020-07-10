import React from "react";
import "./App.css";
import fire from "./config/fire";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);

  const authListener = () => {
    setIsLoadingUser(true);
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoadingUser(false);
      } else {
        setUser(null);
        setIsLoadingUser(false);
      }
    });
  };

  React.useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      <h3>Firebase auth app</h3>
      {isLoadingUser ? <p>Loading...</p> : user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;
