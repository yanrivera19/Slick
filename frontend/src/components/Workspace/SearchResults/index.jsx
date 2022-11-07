import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchResults = ({
  inputValue,
  data,
  handleChannelClick,
  handleResultClick,
  selectedUsers,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    checkForSymbol();
  }, [inputValue]);

  const checkForSymbol = () => {
    let inputValueWithoutSymbol = "";
    let atSymbol = false;
    let hashTagSymbol = false;

    if (inputValue[0] === "@") {
      inputValueWithoutSymbol += inputValue.slice(1);
      atSymbol = true;
    } else if (inputValue[0] === "#") {
      inputValueWithoutSymbol += inputValue.slice(1);
      hashTagSymbol = true;
    } else {
      inputValueWithoutSymbol += inputValue;
    }

    filterData(inputValueWithoutSymbol, atSymbol, hashTagSymbol);
  };

  const filterData = (inputValueWithoutSymbol, atSymbol, hashTagSymbol) => {
    let userAlreadyInDms = false;

    const filtered = data.filter((object) => {
      if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("type") &&
        !atSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("username") &&
        !selectedUsers.includes(object) &&
        !hashTagSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("dmUsers") &&
        !hashTagSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("type") &&
        object.name.toLowerCase().includes(inputValueWithoutSymbol) &&
        !atSymbol
      ) {
        // debugger;
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("username") &&
        !selectedUsers.includes(object) &&
        object.username.toLowerCase().includes(inputValueWithoutSymbol) &&
        !hashTagSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("dmUsers") &&
        object.dmUsers.toLowerCase().includes(inputValueWithoutSymbol) &&
        !hashTagSymbol
      ) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredData(filtered);
  };

  if (filteredData.length === 0) {
    return (
      <div className="search-cont">
        <div className="search-results-cont">
          <span key={0} id="no-results-item">
            No results...
          </span>
        </div>
      </div>
    );
  }

  console.log(filteredData);

  return (
    <div className="search-cont">
      <div className="search-results-cont">
        {filteredData.map((obj) => {
          if (
            obj.hasOwnProperty("username") &&
            obj.username === sessionUser.username &&
            filteredData.length < 2
          ) {
            return (
              <span key={0} id="no-results-item">
                No results...
              </span>
            );
          } else if (obj.hasOwnProperty("type")) {
            return (
              <span
                onClick={(e) => handleChannelClick(e, obj, "channel", true)}
                className="search-result-item"
                key={obj.id * 15}
              >
                {obj.name}
              </span>
            );
          } else if (
            obj.hasOwnProperty("username") &&
            obj.username !== sessionUser.username
          ) {
            return (
              <span
                onClick={(e) => handleResultClick(e, obj)}
                key={obj.id * 7}
                className="search-result-item"
              >
                {obj.username}
              </span>
            );
          } else if (obj.hasOwnProperty("dmUsers")) {
            return (
              <span
                onClick={(e) => handleChannelClick(e, obj.dm, "dm", true)}
                className="search-result-item"
                key={obj.id * 29}
              >
                {obj.dmUsers}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;
