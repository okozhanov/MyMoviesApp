import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchMovies,
  fetchMoviesSearch,
  fetchGenres,
  fetchPersons,
} from "../../../api/moviesApi";

import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchMoviesFailure,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesSuggestFailure,
  fetchSuggestRequest,
  fetchMoviesSuggestSuccess,
  fetchPersonsSuggestSuccess,
  resetFilter,
  setFilter,
  setIsStrictGenres,
  updateFavouritesRequest,
  updateFavouritesSuccess,
  fetchPersonsSuggestFailure,
  setHasNextPage,
} from "./reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import type {
  FetchSearchType,
  FilterMoviesType,
  MovieType,
  SearchTypes,
} from "./declarations";
import {
  favouritesSelector,
  filterSelector,
  searchTypeSelector,
} from "./selectors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import { filter, isEmpty, isNumber, keyBy } from "lodash";
import API_CONSTANTS from "../../../constants/apiContstants";

function* fetchMoviesSaga(): Generator<any, void> {
  try {
    const filter = yield select(filterSelector);

    const response = yield call(fetchMovies, filter);

    yield put(fetchMoviesSuccess(response?.results || []));
    yield put(setHasNextPage(response?.page < response?.total_pages || false));
  } catch (error: any) {
    console.log("fetchMoviesSaga error", error?.message);

    yield put(fetchMoviesFailure(error.message));
  }
}

function* fetchSearchSaga(
  action: PayloadAction<FetchSearchType>
): Generator<any, void> {
  try {
    const searchType: SearchTypes = yield select(searchTypeSelector);

    if (searchType === "movies") {
      const response = yield call(fetchMoviesSearch, action.payload);

      yield put(fetchMoviesSuggestSuccess(response?.results || []));
    } else if (searchType === "persons") {
      const response = yield call(fetchPersons, action.payload);

      yield put(fetchPersonsSuggestSuccess(response?.results || []));
    }
  } catch (error: any) {
    console.log("fetchSearchSaga error", error?.message);
    const searchType: SearchTypes = yield select(searchTypeSelector);

    if (searchType === "movies") {
      yield put(fetchMoviesSuggestFailure(error?.message));
    } else if (searchType === "persons") {
      yield put(fetchPersonsSuggestFailure(error?.message));
    }
  }
}

function* fetchGenresSaga(): Generator<any, void> {
  try {
    const genresString = yield call(AsyncStorage.getItem, STORAGE_KEYS.genres);

    if (genresString) {
      yield put(fetchGenresSuccess(JSON.parse(genresString)));
    }

    const response = yield call(fetchGenres);

    yield put(fetchGenresSuccess(response?.genres || []));

    yield call(
      AsyncStorage.setItem,
      STORAGE_KEYS.genres,
      JSON.stringify(JSON.stringify(response?.genres) || "")
    );
  } catch (error: any) {
    console.log("fetchGenresSaga error", error?.message);
  }
}

function* setIsStrictGenresSaga(
  action: PayloadAction<boolean>
): Generator<any, void> {
  try {
    const filter: FilterMoviesType = yield select(filterSelector);
    const { with_genres } = filter;

    let newGenres;

    if (with_genres) {
      if (!isNumber(with_genres)) {
        if (action?.payload) {
          newGenres = with_genres.replaceAll(
            API_CONSTANTS.PARAMS_SEPARATORS.nonStrict,
            API_CONSTANTS.PARAMS_SEPARATORS.strict
          );
        } else {
          newGenres = with_genres.replaceAll(
            API_CONSTANTS.PARAMS_SEPARATORS.strict,
            API_CONSTANTS.PARAMS_SEPARATORS.nonStrict
          );
        }
      }
    }

    if (newGenres) {
      yield put(setFilter({ ...filter, with_genres: newGenres }));
    }
  } catch (error: any) {
    console.log("setIsStrictGenresSaga error", error?.message);
  }
}

function* setFavouritesSaga(
  action: PayloadAction<Nilable<MovieType>>
): Generator<any, void> {
  try {
    const movie = action?.payload;
    const favouritesCurrent = yield select(favouritesSelector);

    if (movie) {
      const favouritesByIds = keyBy(favouritesCurrent, "id");

      const movieId = movie?.id;
      let newFavourites = [] as MovieType[];

      const isPresent = favouritesByIds.hasOwnProperty(movieId);

      if (isPresent) {
        newFavourites = filter(
          favouritesCurrent,
          (item: MovieType) => item?.id !== movieId
        );
      } else {
        newFavourites = [movie, ...favouritesCurrent];
      }

      yield put(updateFavouritesSuccess(newFavourites));

      yield call(() =>
        AsyncStorage.setItem(
          STORAGE_KEYS.favourites,
          JSON.stringify(newFavourites)
        )
      );
    } else {
      if (isEmpty(favouritesCurrent)) {
        const favouritesString = yield call(
          AsyncStorage.getItem,
          STORAGE_KEYS.favourites
        );

        if (favouritesString) {
          const favouritesOld = JSON.parse(favouritesString || "") || [];

          yield put(updateFavouritesSuccess(favouritesOld));
        }
      }
    }
  } catch (error: any) {
    console.log("setFavouritesSaga error", error?.message);
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      [fetchMoviesRequest.type, setFilter.type, resetFilter.type],
      fetchMoviesSaga
    ),
    takeLatest(fetchSuggestRequest.type, fetchSearchSaga),
    takeLatest(fetchGenresRequest.type, fetchGenresSaga),
    takeLatest(setIsStrictGenres.type, setIsStrictGenresSaga),
    takeLatest(updateFavouritesRequest.type, setFavouritesSaga),
  ]);
}
