import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import "../css/Search.css";

const Search = ({ setSearch, results }) => {
  const [autocomplete, setAutocomplete] = useState(true);
  const [open, setOpen] = useState(false);
  const bar = useRef();

  const handleSearch = (event) => {
    console.log("results ===");
    console.log(results);
    console.log(event.target.value);
    setSearch(event.target.value);
    if (event.target.value === "") {
      setOpen(false);
    }

    if (results && event.target.value) {
      setOpen(true);
      console.log("results ===");
      console.log(results);
      results = results.results.slice(0, 50);
      const data = results.map((result) =>
        result.title ? result.title : result.name
      );
      setAutocomplete(data);
    }
  };

  useEffect(() => {
    console.log("useEffect ===");
    console.log(document);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [open]);

  const handleClickOutside = (event) => {
    console.log("handleClickOutside ===");
    console.log(event);
    console.log(bar);
    if (bar.current && !bar.current.contains(event.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        className="inputSearch"
        placeholder="Search specific character"
        onChange={handleSearch}
      ></input>
      {autocomplete.length > 1 && (
        <div
          className="autocomplete"
          style={{ display: open ? "inherit" : "none" }}
        >
          {autocomplete.map((suggestion, i) => {
            return (
              <div
                key={i}
                className="suggestion"
                onClick={() => {
                  bar.current = suggestion;
                  console.log(suggestion);
                  setSearch(suggestion);
                  setOpen(false);
                }}
              >
                {suggestion}
              </div>
            );
          })}
        </div>
      )}
      <FontAwesomeIcon icon="search" className="InputLogo" />
    </div>
  );
};
export default Search;
