import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchResults = ({
  inputValue,
  data,
  handleChannelClick,
  handleResultClick,
  selectedUsers,
  oneToOneDmUsers,
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
      // console.log(
      //   object.hasOwnProperty("username") &&
      //     !oneToOneDmUsers.includes(object.username) &&
      //     selectedUsers.length < 1
      // );
      // if (
      //   object.hasOwnProperty("username") &&
      //   oneToOneDmUsers.includes(object.username) &&
      //   selectedUsers.length < 1
      // ) {
      //   return false;
      // } else if (

      if (object.hasOwnProperty("type")) {
        if (inputValueWithoutSymbol.length === 0 && !atSymbol) {
          return true;
        } else if (
          inputValueWithoutSymbol.length > 0 &&
          object.name.toLowerCase().includes(inputValueWithoutSymbol) &&
          !atSymbol
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (object.hasOwnProperty("username")) {
        if (
          oneToOneDmUsers.includes(object.username) &&
          selectedUsers.length < 1
        ) {
          return false;
        } else if (
          inputValueWithoutSymbol.length === 0 &&
          !selectedUsers.includes(object) &&
          !hashTagSymbol
        ) {
          return true;
        } else if (
          inputValueWithoutSymbol.length > 0 &&
          !selectedUsers.includes(object) &&
          object.username.toLowerCase().includes(inputValueWithoutSymbol) &&
          !hashTagSymbol
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (object.hasOwnProperty("dmUsers")) {
        if (inputValueWithoutSymbol.length === 0 && !hashTagSymbol) {
          return true;
        } else if (
          inputValueWithoutSymbol.length > 0 &&
          object.dmUsers.toLowerCase().includes(inputValueWithoutSymbol) &&
          !hashTagSymbol
        ) {
          return true;
        } else {
          return false;
        }
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
            obj.username !== sessionUser.username &&
            (selectedUsers.length > 1 || oneToOneDmUsers.includes(obj.username))
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
