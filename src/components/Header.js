import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import LogoSvg from "../assets/img/marvel.svg";
import "../css/Button.css";

const Header = ({ token, setUser }) => {
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
            // className="charactersButton"
            className="button-49"
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
          {token ? (
            <button
              className="button-49"
              onClick={() => {
                navigate("/favorites");
              }}
            >
              Favorites
            </button>
          ) : null}
        </div>
        <p className="titleButton">What is your favorite character/comics?</p>
        <div className="buttons">
          {token ? (
            <div className="buttonSign">
              <button
                className="buttonSignOut"
                onClick={() => {
                  setUser(null);
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="buttonSign">
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
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
