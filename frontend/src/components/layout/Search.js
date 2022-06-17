import React, { useState } from "react";
import { Link } from "react-router-dom";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="gpt3__header-content__input">
        <input
          style={{ color: "black" }}
          type="search"
          id="search_field"
          placeholder="Search products here ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link className="search-home-button" to="/donor/product">
          Donate Now
        </Link>
      </div>
    </form>
  );
};

export default Search;
