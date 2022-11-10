import { useState } from "react";

const SelectedNewMembers = ({ user }) => {
  const [selected, setSelected] = useState(false);

  return (
    <span
      className={`search-result-item ${selected ? "selected" : ""}`}
      onClick={() => setSelected(!selected)}
      // key={obj.id * 29}
    >
      {/* {filterUserfromUsers(obj.users)} */}
      {user.username}
    </span>
  );
};

export default SelectedNewMembers;
