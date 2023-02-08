import { MOVIES } from "flixhq-core";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import {
  Filter,
  IMovieFilter,
  MovieType,
  StreamingServers,
} from "flixhq-core/dist/types/types";

class MovieController {
  protected flixhq;
  protected ApiResponse;

  constructor() {
    this.flixhq = new MOVIES.FlixHQ();
    this.ApiResponse = new ApiResponse();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const data = await this.flixhq.home();
      this.ApiResponse.successResponse(res, data, "Successfully fetched data!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getGenresList = async (_req: Request, res: Response) => {
    try {
      const data = await this.flixhq.fetchGenresList();
      this.ApiResponse.successResponse(res, data, "Successfully fetched genres list!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getCountriesList = async (_req: Request, res: Response) => {
    try {
      const data = await this.flixhq.fetchCountriesList();
      this.ApiResponse.successResponse(res, data, "Successfully fetched countries list!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getMovieByCountry = async (req: Request, res: Response) => {
    const country = decodeURIComponent((req.params as { country: string }).country);
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.fetchMovieByGenreOrCountry(Filter.COUNTRY, country, page);
      this.ApiResponse.successResponse(res, data, `Successfully fetched movies by country ${country}!`);
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getMovieByGenre = async (req: Request, res: Response) => {
    const genre = decodeURIComponent((req.params as { genre: string }).genre);
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.fetchMovieByGenreOrCountry(Filter.GENRE, genre, page);
      this.ApiResponse.successResponse(res, data, `Successfully fetched movies by genre ${genre}!`);
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getMovies = async (req: Request, res: Response) => {
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.fetchMovieByType(MovieType.MOVIE, page);
      this.ApiResponse.successResponse(res, data, "Successfully fetched movies list!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getTvShows = async (req: Request, res: Response) => {
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.fetchMovieByType(MovieType.TVSERIES, page);
      this.ApiResponse.successResponse(res, data, "Successfully fetched TVShows list!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getMovieByTopIMDB = async (req: Request, res: Response) => {
    const type = (req.query as { type: MovieType }).type;
    const page = (req.query as unknown as { page: number }).page;

    if (type && !Object.values(MovieType).includes(type))
      return this.ApiResponse.badRequestResponse(res, "type is not valid!");

    try {
      const data = await this.flixhq.fetchMovieByTopIMDB(type, page);
      this.ApiResponse.successResponse(res, data, "Successfully fetched movies by top IMDB!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getMovieInfo = async (req: Request, res: Response) => {
    const mediaId = (req.query as { mediaId: string }).mediaId;

    if (!mediaId)
      return this.ApiResponse.badRequestResponse(res, "mediaId is required!");

    try {
      const data = await this.flixhq.fetchMovieInfo(mediaId);
      this.ApiResponse.successResponse(res, data, "Successfully fetched movie/tv-show info!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getEpisodeServers = async (req: Request, res: Response) => {
    const mediaId = (req.query as { mediaId: string }).mediaId;
    const episodeId = (req.query as { episodeId: string }).episodeId;

    if (!mediaId)
      return this.ApiResponse.badRequestResponse(res, "mediaId is required!");
    if (!episodeId)
      return this.ApiResponse.badRequestResponse(res, "episodeId is required!");

    try {
      const data = await this.flixhq.fetchEpisodeServers(mediaId, episodeId);
      this.ApiResponse.successResponse(res, data, "Successfully fetched episode servers!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getEpisodeSources = async (req: Request, res: Response) => {
    const mediaId = (req.query as { mediaId: string }).mediaId;
    const episodeId = (req.query as { episodeId: string }).episodeId;
    const server = (req.query as { server: StreamingServers }).server;

    if (!mediaId)
      return this.ApiResponse.badRequestResponse(res, "mediaId is required!");
    if (!episodeId)
      return this.ApiResponse.badRequestResponse(res, "episodeId is required!");
    if (server && !Object.values(StreamingServers).includes(server))
      return this.ApiResponse.badRequestResponse(res, "server is not valid!");

    try {
      const data = await this.flixhq.fetchEpisodeSources(mediaId, episodeId, server);
      this.ApiResponse.successResponse(res, data, "Successfully fetched streaming sources!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public getFiltersList = async (req: Request, res: Response) => {
    try {
      const data = await this.flixhq.fetchFiltersList();
      this.ApiResponse.successResponse(res, data, "Successfully fetched filters list!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public filter = async (req: Request, res: Response) => {
    const options = req.query as IMovieFilter;
    const { type, quality, released, genre, country } = options;
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.filter({ type, quality, released, genre, country }, page);
      this.ApiResponse.successResponse(res, data, "Successfully fetched movies/tv-shows!");
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };

  public search = async (req: Request, res: Response) => {
    const query = decodeURIComponent((req.params as { query: string }).query);
    const page = (req.query as unknown as { page: number }).page;

    try {
      const data = await this.flixhq.search(query, page);
      this.ApiResponse.successResponse(res, data, `Successfully fetched movies/tv-shows has name is ${query}!`);
    } catch (err) {
      this.ApiResponse.serverErrorResponse(res);
    }
  };
}

export default new MovieController();
