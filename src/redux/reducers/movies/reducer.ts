import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchByIdType,
  FetchSearchType,
  FilterMoviesType,
  GenreType,
  MovieDetailsType,
  MoviesStateType,
  MovieType,
  PersonSearchType,
  SearchTypes,
} from "./declarations";
import API_CONSTANTS from "../../../constants/apiContstants";
import { assign, omit, pick } from "lodash";

const initialState: MoviesStateType = {
  // filter
  filter: API_CONSTANTS.DEFAULT_FILTER,
  isFavouritesFiltered: false,
  searchType: API_CONSTANTS.DEFAULT_SEARCH_TYPE,

  // data
  movies: [],
  favourites: [],
  moviesSuggested: [],
  personsSuggested: [],
  hasNextPage: false,

  // genres
  genres: [],
  isStrictGenres: API_CONSTANTS.DEFAULT_STRICT_GENRES,

  // loading
  loadingMovies: false,
  loadingSuggestings: false,

  // errors
  errorMovies: null,
  errorMoviesSuggested: null,
  errorPersonsSuggested: null,
};

export const moduleName = "movies";

const moveisSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    /*
    Filter
    */
    setFilter: (
      state: MoviesStateType,
      action: PayloadAction<FilterMoviesType>
    ) => {
      state.filter = action.payload;
      state.loadingMovies = true;
    },
    resetFilter: (state: MoviesStateType) => {
      state.filter = assign(
        {},
        API_CONSTANTS.DEFAULT_FILTER,
        pick(state.filter, API_CONSTANTS.PERSONS_PARAMS)
      );
      state.isStrictGenres = API_CONSTANTS.DEFAULT_STRICT_GENRES;
    },
    setSearchType: (
      state: MoviesStateType,
      action: PayloadAction<SearchTypes>
    ) => {
      state.searchType = action.payload;
      state.isFavouritesFiltered = false;
    },

    /*
    Movies
    */
    fetchMoviesRequest: (state: MoviesStateType) => {
      state.loadingMovies = true;
      state.errorMovies = null;
    },
    fetchMoviesSuccess: (
      state: MoviesStateType,
      action: PayloadAction<MovieType[]>
    ) => {
      state.loadingMovies = false;
      state.movies = action.payload;
    },
    fetchMoviesFailure: (
      state: MoviesStateType,
      action: PayloadAction<string>
    ) => {
      state.loadingMovies = false;
      state.errorMovies = action.payload;
    },

    setHasNextPage: (
      state: MoviesStateType,
      action: PayloadAction<boolean>
    ) => {
      state.hasNextPage = action.payload;
    },

    /*
    Favourites
    */

    updateFavouritesRequest: (
      _state: MoviesStateType,
      _action: PayloadAction<Nilable<MovieType>>
    ) => {},

    updateFavouritesSuccess: (
      state: MoviesStateType,
      action: PayloadAction<MovieType[]>
    ) => {
      state.favourites = action.payload;
    },

    resetFavourites: (state: MoviesStateType) => {
      state.favourites = [];
    },

    setIsFavouritesFiltered: (
      state: MoviesStateType,
      action: PayloadAction<boolean>
    ) => {
      state.isFavouritesFiltered = action.payload;
    },

    /*
    Movies suggesting
    */
    fetchSuggestRequest: (
      // use for all search types
      state: MoviesStateType,
      _action: PayloadAction<FetchSearchType>
    ) => {
      state.loadingSuggestings = true;
      state.errorMoviesSuggested = null;
      state.errorPersonsSuggested = null;
    },
    fetchMoviesSuggestSuccess: (
      state: MoviesStateType,
      action: PayloadAction<MovieType[]>
    ) => {
      state.moviesSuggested = action.payload;
      state.loadingSuggestings = false;
    },
    fetchMoviesSuggestFailure: (
      state: MoviesStateType,
      action: PayloadAction<string>
    ) => {
      state.errorMoviesSuggested = action.payload;
      state.loadingSuggestings = false;
    },
    resetSuggestings: (state: MoviesStateType) => {
      // use for all search types
      state.moviesSuggested = [];
      state.loadingSuggestings = false;
      state.errorMoviesSuggested = null;
      state.personsSuggested = [];
      state.errorPersonsSuggested = null;
    },

    /*
    Persons suggesting
    */
    fetchPersonsSuggestSuccess: (
      state: MoviesStateType,
      action: PayloadAction<PersonSearchType[]>
    ) => {
      state.personsSuggested = action.payload;
      state.loadingSuggestings = false;
    },
    fetchPersonsSuggestFailure: (
      state: MoviesStateType,
      action: PayloadAction<string>
    ) => {
      state.errorPersonsSuggested = action.payload;
      state.loadingSuggestings = false;
    },

    /*
    Genres 
    */
    fetchGenresRequest: (_state: MoviesStateType) => {},
    fetchGenresSuccess: (
      state: MoviesStateType,
      action: PayloadAction<GenreType[]>
    ) => {
      state.genres = action.payload;
    },
    setIsStrictGenres: (
      state: MoviesStateType,
      action: PayloadAction<boolean>
    ) => {
      state.isStrictGenres = action.payload;
    },
  },
});

export const {
  setFilter,
  resetFilter,
  setIsFavouritesFiltered,
  setSearchType,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  setHasNextPage,
  updateFavouritesRequest,
  updateFavouritesSuccess,
  resetFavourites,
  fetchSuggestRequest,
  fetchMoviesSuggestSuccess,
  fetchMoviesSuggestFailure,
  resetSuggestings,
  fetchPersonsSuggestSuccess,
  fetchPersonsSuggestFailure,
  fetchGenresRequest,
  fetchGenresSuccess,
  setIsStrictGenres,
} = moveisSlice.actions;

export default moveisSlice.reducer;
