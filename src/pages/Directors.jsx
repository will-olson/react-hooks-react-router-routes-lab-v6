import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await fetch('http://localhost:4000/directors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDirectors(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchDirectors();
  }, []);

  return (
    <>
      <NavBar />
      <header>
        <h1>Directors Page</h1>
      </header>
      <main>
        {error ? <p>Error: {error}</p> : directors.map(director => (
          <article key={director.id}>
            <h2>{director.name}</h2>
            <ul>
              {director.movies.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          </article>
        ))}
      </main>
    </>
  );
}

export default Directors;