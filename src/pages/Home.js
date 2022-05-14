import Character from "../components/Character";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import "../css/Home.css";

const Home = ({ data, isLoading, setSearch, page, setPage }) => {
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <div className="containerHome">
        <Search className="searchBar" setSearch={setSearch} results={data} />
        <h1>Characters</h1>
        <div className="character">
          {data.results &&
            data.results.length > 0 &&
            data.results.map((data, index) => {
              return <Character key={index} data={data} />;
            })}
        </div>
        <Pagination data={data} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Home;
