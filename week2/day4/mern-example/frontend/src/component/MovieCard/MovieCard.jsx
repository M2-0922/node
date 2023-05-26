import React from 'react'
import styles from "./movie.module.css"

const MovieCard = ({ id, title, director, duration, picture, rate, year, genre }) => {
  return (
    <div className={styles.card}>
        <img className={styles.customImage} src={picture} alt={title + " - " + id} />
        <h3>{title}</h3>
        <p>Director: {director}</p>
        <p>Duration: {duration}</p>
        <p>Rate: {rate}</p>
        <p>Year: {year}</p>

        <h4>Genres:</h4>
        {
            genre.map((g) => (
                <p>{g}</p>
            ))
        }
    </div>
  )
}

export default MovieCard