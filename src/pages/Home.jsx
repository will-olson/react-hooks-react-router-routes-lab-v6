import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('http://localhost:4000/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <NavBar />
      <header>
        <h1>Home Page</h1>
      </header>
      <main>
        {error ? <p>Error: {error}</p> : movies.map(movie => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} />
        ))}
      </main>
    </>
  );
}

export default Home;