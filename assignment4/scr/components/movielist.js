import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movieGrid">

      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))
      ) : (
        <h3>No Movies Found</h3>
      )}

    </div>
  );
}

export default MovieList;
