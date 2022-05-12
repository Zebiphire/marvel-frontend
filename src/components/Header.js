import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import LogoSvg from "../assets/img/marvel.svg";
import "../css/Button.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <header>
        <img
          className="logoHeader"
          alt="logo marvel comics"
          src={LogoSvg}
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="divButton">
          <button
            className="charactersButton"
            onClick={() => {
              navigate("/");
            }}
          >
            Characters
          </button>
          <button
            className="button-49"
            onClick={() => {
              navigate("/comics");
            }}
          >
            Comics
          </button>
        </div>
        <p className="titleButton">What is your favorite character/comics?</p>
        <button
          className="signinButton"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign-In
        </button>
        <button
          className="signupButton"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign-Up
        </button>
      </header>
    </div>
  );
};

export default Header;
