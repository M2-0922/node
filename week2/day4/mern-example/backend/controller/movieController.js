import fs from "fs"

const getMovies = (req, res) => {
    try {
        
        const movies = JSON.parse(fs.readFileSync("movies.json", "utf-8"));

        res.status(200).json({
            message: "List of movies",
            movies: movies,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

export { getMovies }