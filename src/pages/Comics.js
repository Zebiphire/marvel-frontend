import React, { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../components/Comic";
import "../css/Comics.css";
import Search from "../components/Search";

const Comics = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/comics?search=${search}`
      );
      console.log("response.data === ");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Search setSearch={setSearch} />
      <h1>Comics</h1>
      <div className="characters">
        {data.results &&
          data.results.length > 0 &&
          data.results.map((data, index) => {
            return <Comic key={index} data={data} token={token} />;
          })}
      </div>
    </div>
  );
};

export default Comics;
