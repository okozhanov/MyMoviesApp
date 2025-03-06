import type {
  FilterMoviesType,
  SearchTypes,
} from "../redux/reducers/movies/declarations";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SORT_MOVIES_VALUES = {
  "popularity.desc": "Popularity", // default
  "title.asc": "Title (A-Z)",
  "title.desc": "Title (Z-A)",
  "primary_release_date.desc": "Release date (now-1874)",
  "primary_release_date.asc": "Release date (1874-now)",
};

const DEFAULT_FILTER = {
  page: 1,
  sort_by: "popularity.desc",
} as FilterMoviesType;

const DEFAULT_STRICT_GENRES = false;

const DEFAULT_SEARCH_TYPE = "movies" as SearchTypes;

const PARAMS_SEPARATORS = {
  strict: ",",
  nonStrict: "|",
};

const PERSONS_PARAMS = ["with_cast", "with_crew"];

const API_CONSTANTS = {
  BASE_URL,
  IMAGE_BASE_URL,
  SORT_MOVIES_VALUES,
  DEFAULT_FILTER,
  DEFAULT_STRICT_GENRES,
  DEFAULT_SEARCH_TYPE,
  PARAMS_SEPARATORS,
  PERSONS_PARAMS,
};

export default API_CONSTANTS;
