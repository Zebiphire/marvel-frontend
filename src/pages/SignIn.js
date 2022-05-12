import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/SignIn.css";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      console.log("Je suis dans handleSubmit de signin");
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://marvel-api-nodejs.herokuapp.com/user/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        console.log(response.data.token);
        setUser(response.data.token);
        setIsLoading(false);
        navigate("/");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h2 className="h2Login">Sign In</h2>
      <form onSubmit={handleSubmit} className="formLogin">
        <input
          className="inputLogin"
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputLogin"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
          type="password"
        />
        <span className="loginErrorMessage">{errorMessage}</span>

        <button
          className="buttonLoginPage"
          disabled={isLoading ? true : false}
          type="submit"
        >
          Login
        </button>
        <Link className="linkLogin" to="/signup">
          No account yet ? Sign Up !
        </Link>
        <Link className="linkLogin" to="/signup">
          Problem ?
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
