import React from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MyNav } from "./components/Navbar/Navbar";
import { Characters } from "./components/Characters/Characters";
import { Home } from "./components/Home/Home";

export const apiVersion = "v1"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNav />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index path="/" element={<Home />} />
            <Route path={`/${apiVersion}/characters`}>
              <Route index element={<Characters />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
