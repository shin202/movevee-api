import MovieController from "../controllers/MovieController";
import { Router } from "express";
import ApiResponse from "../utils/ApiResponse";

const router = Router();
const ApiResponses = new ApiResponse();

router.get("/", MovieController.index);
router.get("/genres-list", MovieController.getGenresList);
router.get("/countries-list", MovieController.getCountriesList);

// Fallback router
router.get("/country", (_req, res) => {
  ApiResponses.badRequestResponse(res, "country is required!");
});
router.get("/genre", (_req, res) => {
  ApiResponses.badRequestResponse(res, "genre is required!");
});
router.get("/search", (_req, res) => {
  ApiResponses.badRequestResponse(res, "query is required!");
});

router.get("/country/:country", MovieController.getMovieByCountry);
router.get("/genre/:genre", MovieController.getMovieByGenre);
router.get("/movies", MovieController.getMovies);
router.get("/tv-shows", MovieController.getTvShows);
router.get("/top-imdb", MovieController.getMovieByTopIMDB);
router.get("/info", MovieController.getMovieInfo);
router.get("/episode-servers", MovieController.getEpisodeServers);
router.get("/streaming", MovieController.getEpisodeSources);
router.get("/filters-list", MovieController.getFiltersList);
router.get("/filter", MovieController.filter);
router.get("/search/:query", MovieController.search);

export default router;
