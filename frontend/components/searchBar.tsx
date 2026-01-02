import React from "react";
import Image from "next/image";
import styles from "../styles/searchBar.module.css";
import SearchIcon from "./icons/search";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = "Search Meals",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["icon"]}>
        <SearchIcon />
      </div>
      <input
        className={styles["searchInput"]}
        type="search"
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
