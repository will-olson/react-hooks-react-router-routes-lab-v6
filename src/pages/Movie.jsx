import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
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
    <>
      <NavBar />
      <div>
        <h1>{movie.title}</h1>
        <p>Time: {movie.time} minutes</p>
        <div>
          Genres: {movie.genres.map((genre, index) => (
            <span key={index}>{genre}{index < movie.genres.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movie;