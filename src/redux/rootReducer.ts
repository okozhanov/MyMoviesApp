import moviesReducer, {
  moduleName as moviesReducerModuleName,
} from "./reducers/movies/reducer";

export default {
  [moviesReducerModuleName]: moviesReducer,
};
