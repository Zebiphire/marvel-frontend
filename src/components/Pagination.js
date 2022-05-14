const Pagination = ({ data, page, setPage }) => {
  if (data.count === 0 || !data.count) {
    return <div className="noresult">No result found</div>;
  }
  const displayPage = true;
  const addingPage = 2;
  const total = data.count;
  const pages = data.limit;
  const maxPages = Math.ceil(total / pages);

  const generatePages = () => {
    const results = [];

    const beginning = page - addingPage > 0 ? page - addingPage : 1;
    const ending = page + addingPage < maxPages ? page + addingPage : maxPages;

    for (let index = beginning; index <= ending; index++) {
      results.push(index);
    }
    return results;
  };

  return (
    <div className="pagination">
      {generatePages()[0] !== 1 && (
        <>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setPage(1);
            }}
          >
            {displayPage && "Page "}1
          </a>
          ...
        </>
      )}
      {generatePages().map((nextPage, i) => {
        return (
          <a
            href="/"
            key={i}
            className={`page ${page === nextPage && "current"}`}
            onClick={(e) => {
              e.preventDefault();

              if (page === nextPage) {
                return;
              }

              setPage(nextPage);
            }}
          >
            {displayPage && "Page "}
            {nextPage}
          </a>
        );
      })}
      {generatePages()[generatePages().length - 1] !== maxPages && (
        <>
          ...{" "}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setPage(maxPages);
            }}
          >
            {displayPage && "Page "}
            {maxPages}
          </a>
        </>
      )}
    </div>
  );
};

export default Pagination;
