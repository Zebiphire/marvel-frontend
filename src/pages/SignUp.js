import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SignUp.css";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://marvel-api-nodejs.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: username,
        }
      );
      console.log(response.data);
      if (response.data.newUser.token) {
        setUser(response.data.newUser.token);
        navigate("/");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
      <h2 className="h2Signup">Sign Up</h2>
      <form onSubmit={handleSubmit} className="formSignup">
        <input
          className="inputSignup"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Username"
          type="text"
        />
        <input
          className="inputSignup"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputSignup"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
          type="password"
        />
        <span className="signupErrorMessage">{errorMessage}</span>
        <div className="checkbox">
          <div className="checkboxDiv">
            <input type="checkbox" />
            <span className="checkboxSpan">Subscribe to the newsletter</span>
          </div>
        </div>
        <button className="buttonSignupPage" type="submit">
          Sign Up
        </button>
      </form>
      <Link className="linkSignup" to="/signin">
        Already had an account? Sign In !
      </Link>
    </div>
  );
};

export default SignUp;
