import MainPage from "./MainPage";
import SignIn from "./SIgnIn/SignIn";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  const [isUserLoggedIn, SetisUserLoggedIn] = useState();

  // useEffect(() => {
  //   SetUserData(window.sessionStorage.getItem("userData"));
  // }, []);

  // useEffect(() => {
  //   window.sessionStorage.setItem("userData", userData);
  // }, [userData]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" excact element={<SignIn isUserLoggedIn={isUserLoggedIn} SetisUserLoggedIn={SetisUserLoggedIn} />} />
        <Route path="/Chanacvleba" element={<MainPage isUserLoggedIn={isUserLoggedIn} SetisUserLoggedIn={SetisUserLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
