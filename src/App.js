import React, { useState, useEffect, component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "./components/Header";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import SpecificCharacter from "./pages/SpecificCharacter";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/characters`
      );
      console.log("response.data === ");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home data={data} isLoading={isLoading} />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/comics" element={<Comics />} />
        <Route path="/specific/:id" element={<SpecificCharacter />} />
        {/* <Route path="/characters" element={<Characters />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
