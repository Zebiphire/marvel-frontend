import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "../components/Character";
import "../css/Characters.css";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/characters`
      );
      console.log("response.data === ");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <h1>Characters</h1>
      <div className="characters">
        {data.results &&
          data.results.length > 0 &&
          data.results.map((data, index) => {
            return <Character key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Characters;
