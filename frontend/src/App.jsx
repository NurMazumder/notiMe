import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import NavbarM from "./components/Navbar/NavbarM/NavbarM";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./actions/setAuthToken";
import Container from "./components/Container/Container";
import Alert from "./components/Alert/Alert";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <NavbarM />
          <section>
            <Alert />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
