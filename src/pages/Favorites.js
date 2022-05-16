import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [idFavorite, setIdFavorite] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("je suis dans axios");
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/favorites`,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response === ");
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  const refreshPage = () => {
    window.location.reload();
  };

  // TODO Helpers
  const RemoveFavorite = async (id, categoryFavorite) => {
    if (
      id === "" ||
      id === undefined ||
      categoryFavorite === undefined ||
      categoryFavorite === ""
    ) {
    } else {
      try {
        const response = await axios.post(
          `https://marvel-api-nodejs.herokuapp.com/favorites/remove`,
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
        if (response) {
          refreshPage();
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <div>
      <h2>Favorites</h2>
      {data &&
        data.length > 0 &&
        data.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.category}</p>
              <p>{data.id}</p>
              <button
                className="removeCharacterFav"
                onClick={() => {
                  // setIsLoading(true);
                  RemoveFavorite(data.id, data.category);
                }}
              >
                Remove favorite
              </button>
            </div>
          );
        })}
    </div>
  );
};
export default Favorites;
