import React, { useState } from "react";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  const movies = [
    {
      id: 1,
      title: "Avatar",
      year: 2009,
      image: "https://via.placeholder.com/200x280?text=Avatar"
    },
    {
      id: 2,
      title: "Avengers Endgame",
      year: 2019,
      image: "https://via.placeholder.com/200x280?text=Avengers"
    },
    {
      id: 3,
      title: "Batman Begins",
      year: 2005,
      image: "https://via.placeholder.com/200x280?text=Batman"
    },
    {
      id: 4,
      title: "Black Panther",
      year: 2018,
      image: "https://via.placeholder.com/200x280?text=Black+Panther"
    },
    {
      id: 5,
      title: "Barbie",
      year: 2023,
      image: "https://via.placeholder.com/200x280?text=Barbie"
    },
    {
      id: 6,
      title: "Bahubali",
      year: 2015,
      image: "https://via.placeholder.com/200x280?text=Bahubali"
    },
    {
      id: 7,
      title: "Frozen",
      year: 2013,
      image: "https://via.placeholder.com/200x280?text=Frozen"
    },
    {
      id: 8,
      title: "Joker",
      year: 2019,
      image: "https://via.placeholder.com/200x280?text=Joker"
    }
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().startsWith(search.toLowerCase())
  );

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;
