import { all, AllEffect, fork, ForkEffect } from "redux-saga/effects";

import uploadSaga from "sagas/uploadSaga";

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(uploadSaga)]);
}
