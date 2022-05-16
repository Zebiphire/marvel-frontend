import React, { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../components/Comic";
import "../css/Comics.css";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Comics = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/comics?search=${search}&page=${page}&limit=${limit}`
      );
      console.log("response.data === ");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Search setSearch={setSearch} results={data} />
      <h1>Comics</h1>
      <div className="characters">
        {data.results &&
          data.results.length > 0 &&
          data.results.map((data, index) => {
            return <Comic key={index} data={data} token={token} />;
          })}
      </div>
      <Pagination data={data} page={page} setPage={setPage} />
    </div>
  );
};

export default Comics;
