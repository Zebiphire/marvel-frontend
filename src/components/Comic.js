import { useNavigate } from "react-router-dom";

const Comics = ({ data }) => {
  let navigate = useNavigate();

  return (
    <div className="containerComics">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <img
        alt="thumbnail marvel"
        src={data.thumbnail.path + "." + data.thumbnail.extension}
      />
    </div>
  );
};
export default Comics;
