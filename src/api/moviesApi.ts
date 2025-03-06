import queryString from "query-string";
import API_CONSTANTS from "../constants/apiContstants";
import type {
  FetchByIdType,
  FetchSearchType,
  FilterMoviesType,
} from "../redux/reducers/movies/declarations";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI3ZTQ0NTYyOWE3NDgwOWU5MmE2OTc1OWYyMjBkMSIsIm5iZiI6MTc0MDU3MTE5Mi40MTgsInN1YiI6IjY3YmYwMjM4NmYwN2YwOGNkNTU2MmJhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dra7hoJr-BpAAzCy8uZ8JdI65XfxViYeL_8zhLYYuTc";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/json",
};

const callApi = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    return response.json();
  } catch (e) {
    console.warn("callApi error", url, e);
  }
};

export const fetchMovies = async (params: FilterMoviesType) => {
  try {
    const url = queryString.stringifyUrl({
      url: API_CONSTANTS.BASE_URL + "/discover/movie",
      query: params,
    });

    return await callApi(url);
  } catch (e) {
    console.warn("fetchMovies error", e);
  }
};

export const fetchMoviesSearch = async (params: FetchSearchType) => {
  try {
    const url = queryString.stringifyUrl({
      url: API_CONSTANTS.BASE_URL + "/search/movie",
      query: params,
    });

    return await callApi(url);
  } catch (e) {
    console.warn("fetchMoviesSearch error", e);
  }
};

export const fetchMovieDetails = async (params: FetchByIdType) => {
  try {
    const url = API_CONSTANTS.BASE_URL + "/movie/" + params.id;
    return await callApi(url);
  } catch (e) {
    console.warn("fetchMovieDetails error", e);
  }
};

export const fetchMovieSimilars = async (params: FetchByIdType) => {
  try {
    const url = API_CONSTANTS.BASE_URL + "/movie/" + params.id + "/similar";
    return await callApi(url);
  } catch (e) {
    console.warn("fetchMovieSimilars error", e);
  }
};

export const fetchGenres = async () => {
  try {
    const url = API_CONSTANTS.BASE_URL + "/genre/movie/list";

    return await callApi(url);
  } catch (e) {
    console.warn("fetchGenres error", e);
  }
};

export const fetchPersons = async (params: FetchSearchType) => {
  try {
    const url = queryString.stringifyUrl({
      url: API_CONSTANTS.BASE_URL + "/search/person",
      query: params,
    });

    return await callApi(url);
  } catch (e) {
    console.warn("fetchPersons error", e);
  }
};

export const fetchPersonDetails = async (params: FetchByIdType) => {
  try {
    const url = API_CONSTANTS.BASE_URL + "/person/" + params.id;

    return await callApi(url);
  } catch (e) {
    console.warn("fetchPersonDetails error", e);
  }
};
