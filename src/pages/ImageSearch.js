import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [searchInput, updateSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

  const getImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput}&client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=20`
    );
    setResult(response.data.results);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setPage(1);
      getImages();
    }
  };

  const goNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    getImages();
  };

  const goPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    getImages();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search bar */}
      <div className="flex w-1/2 mt-20 mb-10">
        <input
          type="text"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for images"
          value={searchInput}
          onChange={(event) => updateSearchInput(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          className="ml-2 px-4 py-2.5 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          onClick={() => {
            setPage(1);
            getImages();
          }}
        >
          Search
        </button>
      </div>

      {/* Images display */}
      <div className="columns-4 gap-6 my-8 max-w-7xl mx-auto">
        {result.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          result.map((val) => (
            <img
              key={val.id}
              className="col-span-1 w-full h-auto rounded-lg mb-6"
              src={val.urls.small}
              alt={val.alt_description}
            />
          ))
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex mt-4">
        <button
          type="button"
          className="mr-2 px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          onClick={goPreviousPage}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          onClick={goNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSearch;
