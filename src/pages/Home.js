import Character from "../components/Character";

const Home = ({ data, isLoading }) => {
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <h1>Characters</h1>
      <div className="comics">
        {data.results &&
          data.results.length > 0 &&
          data.results.map((data, index) => {
            return <Character key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
