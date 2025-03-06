export type MovieType = {
  adult: boolean;
  backdrop_path: Nullable<string>; // '/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg'
  genre_ids: number[];
  id: number;
  original_language: string; // en
  original_title: string; // 'Toy Story'
  overview: string;
  popularity: number; // 66.38
  poster_path: Nullable<string>; // '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg'
  release_date: string; // '1995-11-22'
  title: string; // 'Toy Story'
  video: boolean;
  vote_average: number; // 8
  vote_count: number; // 18647
};

export type FilterMoviesType = {
  page: number;
  sort_by?:
    | "popularity.desc" // default
    | "title.desc"
    | "title.asc"
    | "primary_release_date.desc"
    | "primary_release_date.asc";
  year?: number & { min: 1930; max: 2025 };
  with_genres?: number | string; // genre_id (AND - '12,28,53', OR - '12|28|53')
  with_cast?: number; // person_id
  with_crew?: number; // director_id
};

export type FetchByIdType = { id: number };

export type FetchSearchType = { query: string };

export type GenreType = {
  id: number;
  name: string;
};

type PersonsDepartments =
  | "Acting" // 'with_cast' param for search
  | "Directing" // 'with_crew' param for search (here and hereafter)
  | "Writing"
  | "Editing"
  | "Camera"
  | "Production"
  | "Art"
  | "Sound";

export type PersonSearchType = {
  adult: boolean;
  gender: 1 | 2;
  id: number;
  name: string; // 'Tom Hanks'
  original_name: string; // 'Tom Hanks'
  popularity: number; // 39.519
  profile_path: string; // '/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg'
  known_for_department: PersonsDepartments;
  known_for: MovieType[];
};

export type MovieDetailsType = {
  adult: boolean;
  backdrop_path: string; // '/mzfx54nfDPTUXZOG48u4LaEheDy.jpg'
  belongs_to_collection: any;
  budget: number; // 55000000
  genres: GenreType[];
  homepage: string; // 'https://www.paramountmovies.com/movies/forrest-gump'
  id: number; // 13
  imdb_id: string; // 'tt0109830'
  origin_country: string[]; // ["US"]
  original_language: string; // en
  original_title: string; // Forrest Gump
  overview: string;
  popularity: number; // 57.604
  poster_path: string; // '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
  production_companies: {
    id: number;
    logo_path: string; // '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png'
    name: string; // 'Paramount Pictures'
    origin_country: string; // 'US'
  }[];

  production_countries: {
    iso_3166_1: string; // 'US'
    name: string; // 'United States of America'
  }[];
  release_date: string; // '1994-06-23'
  revenue: number; // 677387716
  runtime: number; // 142
  spoken_languages: {
    english_name: string; // 'English'
    iso_639_1: string; // 'en'
    name: string; // 'English'
  }[];
  status: string; // 'Released'
  tagline: string; // 'The world will never be the same once you've seen it through the eyes of Forrest Gump.'
  title: string; // 'Forrest Gump'
  video: boolean;
  vote_average: number; // 8.5
  vote_count: number; // 27886
};

export type SearchTypes = "movies" | "persons";

export type MoviesStateType = {
  // filter
  filter: FilterMoviesType;
  isFavouritesFiltered: boolean;
  searchType: SearchTypes;

  // data
  movies: MovieType[];
  favourites: MovieType[];
  moviesSuggested: MovieType[];
  personsSuggested: PersonSearchType[];
  hasNextPage: boolean;

  // genres
  genres: GenreType[];
  isStrictGenres: boolean;

  // loading
  loadingMovies: boolean;
  loadingSuggestings: boolean;

  // errors
  errorMovies: Nullable<string>;
  errorMoviesSuggested: Nullable<string>;
  errorPersonsSuggested: Nullable<string>;
};

export type PersonDetailsType = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Nullable<string>; // "1956-07-09"
  deathday: Nullable<string>;
  gender: 1 | 2;
  homepage: Nullable<string>;
  id: number;
  imdb_id: string;
  known_for_department: PersonsDepartments;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string; // "/oFvZoKI6lvU03n4YoNGAll9rkas.jpg"
};
