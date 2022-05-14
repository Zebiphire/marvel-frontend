import { useNavigate } from "react-router-dom";
import "../css/Character.css";

const Character = ({ data }) => {
  let navigate = useNavigate();
  return (
    <div className="characterContainer">
      <div className="containerCharacters">
        <div
          className="wrapCharacters"
          onClick={() => navigate(`specific/${data._id}`)}
        >
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <img
            alt="thumbnail marvel"
            src={data.thumbnail.path + "." + data.thumbnail.extension}
          />
          <div className="character">
            {/* {data &&
          data.map((data, index) => {
            return <h2>{data[index]}</h2>;
          })} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Character;
