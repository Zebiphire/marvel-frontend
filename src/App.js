import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import SpecificCharacter from "./pages/SpecificCharacter";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Favorite from "./pages/Favorites";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  library.add(faSearch);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const limit = 100;
  const [page, setPage] = useState(1);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/characters?search=${search}&page=${page}&limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search, page]);

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              isLoading={isLoading}
              setSearch={setSearch}
              page={setPage}
              setPage={setPage}
            />
          }
        />
        <Route
          path="/comics"
          element={<Comics setSearch={setSearch} token={token} />}
        />
        <Route
          path="/specific/:id"
          element={<SpecificCharacter token={token} />}
        />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/favorites" element={<Favorite token={token} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
