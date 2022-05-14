import "../css/ButtonFavorite.css";
import axios from "axios";

const Comics = ({ data, token }) => {
  const SendFavorite = async (id, categoryFavorite) => {
    console.log(id);
    if (
      id === "" ||
      id === undefined ||
      categoryFavorite === undefined ||
      categoryFavorite === ""
    ) {
      return;
    } else {
      try {
        const response = await axios.post(
          `https://marvel-api-nodejs.herokuapp.com/favorites/save`,
          {
            id: id,
            category: categoryFavorite,
          },
          {
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.error) {
          return alert(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="containerComics">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <img
        alt="thumbnail marvel"
        src={data.thumbnail.path + "." + data.thumbnail.extension}
      />
      <button
        class="button-82-pushable"
        onClick={async () => {
          SendFavorite(data._id, "comics");
        }}
      >
        {" "}
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text">Add to favorite</span>
      </button>
    </div>
  );
};
export default Comics;
