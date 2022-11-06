import { useEffect } from "react";
import { useState } from "react";

const SearchResults = ({ inputValue, data }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [inputValue]);

  const filterData = () => {
    const filtered = data.filter((object) => {
      // debugger;
      if (
        object.hasOwnProperty("type") &&
        object.name.includes(inputValue.toLowerCase())
      ) {
        // debugger;
        return object;
      } else if (
        object.hasOwnProperty("username") &&
        object.username.includes(inputValue.toLowerCase())
      ) {
        // debugger;
        return object;
      }
    });

    setFilteredData(filtered);
  };

  if (filteredData.length === 0) return null;

  return (
    <div className="search-cont">
      <div className="search-results-cont">
        {filteredData.map((obj) => {
          if (obj.hasOwnProperty("type")) {
            return <div className="search-result-item">{obj.name}</div>;
          } else {
            return <div className="search-result-item">{obj.username}</div>;
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;
