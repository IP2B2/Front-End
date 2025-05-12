import { useState } from "react";
import Image from "next/image";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Cauta un echipament"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.iconButton}>
       <Image
          src="/icons/SearchIcon.png"
          alt="Caută"
          width={18}
          height={18}
          className={styles.iconImage}
        />
      </button>
    </form>
  );
}
