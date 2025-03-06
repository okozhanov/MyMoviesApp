import { spawn } from "redux-saga/effects";

import moviesSaga from "./reducers/movies/saga";

export default function* rootSaga() {
  yield spawn(moviesSaga);
}
