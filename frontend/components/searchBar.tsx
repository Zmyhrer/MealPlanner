import React from "react";
import Image from "next/image";
import styles from "../styles/searchBar.module.css";

const searchBar = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["icon"]}>
        <Image src="/search.png" alt="search icon" width={20} height={20} />
      </div>
      <input
        className={styles["searchInput"]}
        type="search"
        id="searchInput"
        placeholder="Search Meals"
      />
    </div>
  );
};

export default searchBar;
