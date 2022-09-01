import MainPage from "./MainPage";
import SignIn from "./SIgnIn/SignIn";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [userData, SetUserData] = useState("");
  useEffect(() => {
    SetUserData(window.sessionStorage.getItem("userData"));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("userData", userData);
  }, [userData]);
  return (
    <Router>
      <Routes>

        <Route path="/" excact element={<SignIn SetUserData={SetUserData}/>} />
        {
          userData.length && 
        <Route path="/Chanacvleba" element={<MainPage />} />

        }

      </Routes>
    </Router>
  );
}

export default App;
