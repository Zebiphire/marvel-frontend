import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/SpecificComics.css";

const SpecificComics = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("id ==", id);
      let characterId = id;
      const response = await axios.get(
        `https://marvel-api-nodejs.herokuapp.com/comics/${characterId}`
        // `https://marvel-api-nodejs.herokuapp.com/comics/5fcf91f4d8a2480017b91453`
      );
      console.log("response ==", response);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div>
      <p>Loading</p>
    </div>
  ) : (
    <div className="containerComics">
      <p className="comicsId">{data.name}</p>

      <img
        className="contain-img "
        src={data.thumbnail.path + "." + data.thumbnail.extension}
        alt="comicsImg"
      />
      <div>
        <div>
          <p>Comics with this specific character :</p>
        </div>

        {data.comics.map((comic, index) => {
          return (
            <div className="containerComics" key={comic._id}>
              <div className="comicsId">
                <p className="titleComics">{comic.title}</p>
              </div>

              <img
                className="contain-img "
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt="comicsImg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SpecificComics;
