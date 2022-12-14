import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchResults = ({
  inputValue,
  data,
  dms,
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

  const filterUserfromUsers = (users) => {
    let filteredUsers = [];

    Object.values(users).forEach((user) => {
      if (user.username !== sessionUser.username) {
        filteredUsers.push(user.username);
      }
    });

    return filteredUsers.join(", ");
  };

  const filterData = (inputValueWithoutSymbol, atSymbol, hashTagSymbol) => {
    let filtered = data.filter((object) => {
      if (
        (inputValueWithoutSymbol.length === 0 &&
          object.hasOwnProperty("name") &&
          !atSymbol) ||
        (inputValueWithoutSymbol.length === 0 &&
          object.hasOwnProperty("username") &&
          !selectedUsers.includes(object) &&
          !hashTagSymbol) ||
        (inputValueWithoutSymbol.length === 0 &&
          object.hasOwnProperty("users") &&
          !object.hasOwnProperty("ownerId") &&
          !hashTagSymbol) ||
        (inputValueWithoutSymbol.length > 0 &&
          object.hasOwnProperty("name") &&
          object.name.toLowerCase().includes(inputValueWithoutSymbol) &&
          !atSymbol) ||
        (inputValueWithoutSymbol.length > 0 &&
          object.hasOwnProperty("username") &&
          !selectedUsers.includes(object) &&
          object.username.toLowerCase().includes(inputValueWithoutSymbol) &&
          !hashTagSymbol) ||
        (inputValueWithoutSymbol.length > 0 &&
          object.hasOwnProperty("users") &&
          !object.hasOwnProperty("ownerId") &&
          Object.values(object.users)
            .map((user) => user.username)
            .join(" ")
            .toLowerCase()
            .includes(inputValueWithoutSymbol) &&
          !hashTagSymbol)
      ) {
        return true;
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
          } else if (obj.hasOwnProperty("name")) {
            return (
              <span
                onClick={(e) => handleChannelClick(e, obj, "Channel", true)}
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
                onClick={(e) => {
                  handleResultClick(e, obj);
                }}
                key={obj.id * 7}
                className="search-result-item"
              >
                {obj.username}
              </span>
            );
          } else if (
            obj.hasOwnProperty("users") &&
            selectedUsers.length === 0
          ) {
            return (
              <span
                onClick={(e) =>
                  handleChannelClick(e, obj, "DirectMessage", true)
                }
                className="search-result-item"
                key={obj.id * 29}
                style={{ fontWeight: "900" }}
              >
                {`Open DM: ${filterUserfromUsers(obj.users)}`}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;
