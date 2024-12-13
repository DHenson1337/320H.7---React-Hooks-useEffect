import { useState, useEffect } from "react";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import "./App.css";

export default function App() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY; // Access API key from .env
  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  //This useEffect will run once when the component is mounted
  useEffect(() => {
    getMovie("Clueless"); //Fetch a default movie on load
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
