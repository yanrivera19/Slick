import { useState } from "react";

const SelectedNewMembers = ({ user, handleResultClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    handleResultClick(user);
  };

  return (
    <span
      className={`search-result-item-teammates ${selected ? "selected" : ""}`}
      onClick={handleClick}
      // key={obj.id * 29}
    >
      {user.username} - ({user.email})
    </span>
  );
};

export default SelectedNewMembers;
