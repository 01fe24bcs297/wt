import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="searchBox"
      type="text"
      placeholder="Search movie (Example: ba)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
