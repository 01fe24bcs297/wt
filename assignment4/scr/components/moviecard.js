import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="card">

      <img
        src={movie.image}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <p>Release Year: {movie.year}</p>

    </div>
  );
}

export default MovieCard;
