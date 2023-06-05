import React from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MyNav } from "./components/Navbar/Navbar";
import { Characters } from "./components/Characters/Characters";
import { Home } from "./components/Home/Home";
import { SingleCharacter } from "./components/DetailCard/SingleCharacter";
import { Crews } from "./components/Crews/Crews";
import { Fruits } from "./components/Fruits/Fruits";
import SingleCrew from "./components/DetailCard/SingleCrew";
import SingleFruit from "./components/DetailCard/SingleFruit";
import Signup from "./components/Users/Signup/Signup";
import Login from "./components/Users/Login/Login";
import EmailConfirmation from "./components/Users/EmailConfirmation/EmailConfirmation";
import Footer from "./components/Footer/Footer";
import { Me } from "./components/Users/Me/Me";

export const apiVersion = "v1";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App" id="grad">
        <MyNav />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path={`/${apiVersion}/characters`}>
              <Route index element={<Characters />} />
              <Route path=":_id" element={<SingleCharacter />} />
            </Route>
            <Route path={`/${apiVersion}/crews`}>
              <Route index element={<Crews />} />
              <Route path=":_id" element={<SingleCrew />} />
            </Route>
            <Route path={`/${apiVersion}/fruits`}>
              <Route index element={<Fruits />} />
              <Route path=":_id" element={<SingleFruit />} />
            </Route>
            <Route path={`/${apiVersion}/users/`}>
              <Route path="signup" element={<Signup />} />
              <Route path="validate" element={<EmailConfirmation />} />
              <Route path="login" element={<Login />} />
              <Route path="me" element={<Me />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
