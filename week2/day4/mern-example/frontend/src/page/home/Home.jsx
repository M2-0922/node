import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../component/MovieCard/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + "/api/movie/").then((res) => {
      setMovies(res.data.movies);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Id irure aliquip eu eiusmod quis proident ut incididunt laborum. Pariatur occaecat labore ea tempor sint id deserunt pariatur enim enim aute Lorem. Sint est aliquip dolor deserunt aliqua incididunt dolor voluptate adipisicing eu proident laboris. Voluptate aliqua id cupidatat nostrud sint laborum velit aliqua voluptate anim. Veniam sit laboris id ut sint et deserunt nisi adipisicing.</p>
      <button>Discover</button>

      <h2>Movie List</h2>
      <div className="movie-list">
      {
        movies.map((movie) => (
          <MovieCard {...movie} />
        ))
      }
      </div>
    </div>
  );
};

export default Home;
