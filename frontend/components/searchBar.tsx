import React from "react";
import Image from "next/image";
import styles from "../styles/searchBar.module.css";

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
        <Image src="/search.png" alt="search icon" width={20} height={20} />
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
