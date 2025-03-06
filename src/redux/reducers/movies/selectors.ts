import { createSelector } from "reselect";
import { moduleName } from "./reducer";
import { RootState } from "../../store";
import { has, isEmpty, isEqual, keyBy, omit } from "lodash";
import API_CONSTANTS from "../../../constants/apiContstants";

const moviesState = (state: RootState) => state[moduleName];

// filter

export const filterSelector = createSelector(
  moviesState,
  (state) => state.filter
);

export const isDefaultFilterSelector = createSelector(
  moviesState,
  (state) =>
    isEqual(
      omit(state.filter, API_CONSTANTS.PERSONS_PARAMS),
      API_CONSTANTS.DEFAULT_FILTER
    ) && state.isStrictGenres === API_CONSTANTS.DEFAULT_STRICT_GENRES
);

export const searchTypeSelector = createSelector(
  moviesState,
  (state) => state.searchType
);

export const isSelectedPersonSelector = createSelector(moviesState, (state) =>
  API_CONSTANTS.PERSONS_PARAMS.some((key) => has(state.filter, key))
);

// data

export const moviesSelector = createSelector(
  moviesState,
  (state) => state.movies
);

export const moviesSuggestedSelector = createSelector(
  moviesState,
  (state) => state.moviesSuggested
);

export const personsSuggestedSelector = createSelector(
  moviesState,
  (state) => state.personsSuggested
);

export const isPresentSuggestingSelector = createSelector(
  moviesState,
  (state) => !isEmpty(state.moviesSuggested) || !isEmpty(state.personsSuggested)
);

export const hasNextPageSelector = createSelector(
  moviesState,
  (state) => state.hasNextPage
);

// favourites

export const favouritesSelector = createSelector(
  moviesState,
  (state) => state.favourites
);

export const isPresentFavouritesSelector = createSelector(
  moviesState,
  (state) => !isEmpty(state.favourites)
);

export const favouritesByIdSelector = createSelector(moviesState, (state) =>
  keyBy(state.favourites, "id")
);

export const isFavouritesFilteredSelector = createSelector(
  moviesState,
  (state) => state.isFavouritesFiltered
);

// genres

export const genresSelector = createSelector(
  moviesState,
  (state) => state.genres
);

export const isStrictGenresSelector = createSelector(
  moviesState,
  (state) => state.isStrictGenres
);

// loading

export const loadingMoviesSelector = createSelector(
  moviesState,
  (state) => state.loadingMovies
);

export const loadingSuggestingsSelector = createSelector(
  moviesState,
  (state) => state.loadingSuggestings
);

// errors

export const errorMoviesSelector = createSelector(
  moviesState,
  (state) => state.errorMovies
);

export const errorMoviesSuggestedSelector = createSelector(
  moviesState,
  (state) => state.errorMoviesSuggested
);
