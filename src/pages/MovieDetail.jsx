import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const response = await fetch(`http://localhost:4000/movies/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchMovieDetail();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Time: {movie.time} minutes</p>
      <p>Genres: {movie.genres.join(", ")}</p>
    </div>
  );
}

export default MovieDetail;