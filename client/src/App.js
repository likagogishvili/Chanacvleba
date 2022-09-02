import MainPage from "./MainPage";
import SignIn from "./SIgnIn/SignIn";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [isUserLoggedIn, SetisUserLoggedIn] = useState();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          excact
          element={
            <SignIn
              isUserLoggedIn={isUserLoggedIn}
              SetisUserLoggedIn={SetisUserLoggedIn}
            />
          }
        />
        <Route
          path="/Chanacvleba"
          element={
            <MainPage
              isUserLoggedIn={isUserLoggedIn}
              SetisUserLoggedIn={SetisUserLoggedIn}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
