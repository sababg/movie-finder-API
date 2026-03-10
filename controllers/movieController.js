import axios from "axios";

const movie = axios.create({
  baseURL: "http://www.omdbapi.com/",
  timeout: 5000,
});

export const searchMovies = async (req, res) => {
  const { title } = req.query;
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Movie configuration error" });
  }

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    const response = await movie.get("/", {
      params: {
        s: title,
        apikey: apiKey,
      },
    });

    if (response?.Response === "False") {
      return res.status(404).json({ error: response?.Error || "No results" });
    }

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json({
        error:
          error.response.data.Error ||
          "An error occurred while fetching movie data",
      });
    } else if (error.request) {
      console.log(error.request);
      res.status(502).json({ error: "Network error" });
    } else {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Movie configuration error" });
  }

  if (!id) {
    return res.status(400).json({ error: "Movie ID parameter is required" });
  }

  try {
    const response = await movie.get("/", {
      params: {
        i: id,
        apikey: apiKey,
      },
    });

    if (response?.Response === "False") {
      return res.status(404).json({ error: response?.Error || "No results" });
    }

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json({
        error:
          error.response.data.Error ||
          "An error occurred while fetching movie data",
      });
    } else if (error.request) {
      console.log(error.request);
      res.status(502).json({ error: "Network error" });
    } else {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
