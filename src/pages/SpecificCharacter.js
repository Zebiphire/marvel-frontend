import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ButtonFavorite.css";
import "../css/SpecificCharacter.css";

const SpecificCharacter = ({ token }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/character/${id}`
      );
      setCharacter(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const SendFavorite = async (id, categoryFavorite) => {
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
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <section className="character">
      <Link to="/" className="previous">
        <div>See all characters</div>
      </Link>
      <h1>{character.name}</h1>
      <button
        class="button-82-pushable"
        onClick={async () => {
          SendFavorite(id, "character");
        }}
      >
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text">Add to favorite</span>
      </button>
      <div className="character-details">
        <div className="picture">
          <img
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={character.name}
            className="character-thumbnail"
          />
        </div>
        <p className="description">{character.description}</p>
      </div>

      <h2>Related comics</h2>
      <div>
        {character.comics.map((comic) => {
          return <h4>{comic}</h4>;
        })}
        {character.comics.length === 0 && <div>No comics found ! </div>}
      </div>
    </section>
  );
};

export default SpecificCharacter;
