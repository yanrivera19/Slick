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

  const checkDms = (user) => {
    let oneToOne = [];
    let includes = false;

    dms.forEach((dm) => {
      if (dm.users.length === 2) {
        oneToOne.push(dm);
      }
    });

    oneToOne.forEach((dm) => {
      if (dm.users.map((dmUser) => dmUser.username).includes(user)) {
        includes = true;
      }
    });

    return includes;
  };

  const filterUserfromUsers = (users) => {
    let filteredUsers = [];

    users.forEach((user) => {
      if (user.username !== sessionUser.username) {
        filteredUsers.push(user.username);
      }
    });

    return filteredUsers.join(", ");
  };

  const filterData = (inputValueWithoutSymbol, atSymbol, hashTagSymbol) => {
    let filtered = data.filter((object) => {
      // debugger;
      if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("name") &&
        !atSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("username") &&
        !selectedUsers.includes(object) &&
        !hashTagSymbol &&
        selectedUsers.length < 1
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length === 0 &&
        object.hasOwnProperty("users") &&
        !hashTagSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("name") &&
        object.name.toLowerCase().includes(inputValueWithoutSymbol) &&
        !atSymbol
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("username") &&
        !selectedUsers.includes(object) &&
        object.username.toLowerCase().includes(inputValueWithoutSymbol) &&
        !hashTagSymbol &&
        selectedUsers.length < 1
      ) {
        return true;
      } else if (
        inputValueWithoutSymbol.length > 0 &&
        object.hasOwnProperty("users") &&
        object.users
          .join(" ")
          .toLowerCase()
          .includes(inputValueWithoutSymbol) &&
        !hashTagSymbol
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
          } else if (obj.hasOwnProperty("name")) {
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
            !checkDms(obj.username)
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
          } else if (obj.hasOwnProperty("users")) {
            return (
              <span
                onClick={(e) => handleChannelClick(e, obj, "dm", true)}
                className="search-result-item"
                key={obj.id * 29}
              >
                {filterUserfromUsers(obj.users)}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;
