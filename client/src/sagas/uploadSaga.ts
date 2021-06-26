import {
  put,
  call,
  take,
  takeLatest,
  ForkEffect,
  cancelled,
  race,
  fork,
  cancel,
  all,
} from "redux-saga/effects";
import axios from "axios";

import { actions } from "slices/upload";
import { NewFile, UploadingStatus } from "models";

const getBlobFromObjectUrl = (url) => {
  return fetch(url).then((r) => r.blob());
};

function* uploadSingleFileTask(asset: NewFile) {
  let cancelRequest = null;

  yield put(actions.updateNewFileStatus({ id: asset.id, status: UploadingStatus.UPLOAD_ONGOING }));

  try {
    const blob = yield call(getBlobFromObjectUrl, asset.objectUrl);

    const formData = new FormData();
    formData.append("file", blob, asset.name);

    const options = {
      cancelToken: new axios.CancelToken(function executor(c) {
        // An executor function receives a cancel function as a paramet
        cancelRequest = c;
      }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = yield call(axios.post, "http://localhost:9001/upload", formData, options);

    if (response.status === 200) {
      yield put(
        actions.updateNewFileStatus({ id: asset.id, status: UploadingStatus.UPLOAD_SUCCEEDED })
      );
    } else {
      throw new Error("Upload failed");
    }
  } catch (e) {
    yield put(
      actions.updateNewFileStatus({
        id: asset.id,
        status: UploadingStatus.UPLOAD_FAILED,
      })
    );
  } finally {
    if (yield cancelled()) {
      cancelRequest();
    }
  }
}

function* watchForUploadCancellation(asset) {
  while (true) {
    const { payload: assetId } = yield take(actions.cancelUploadingFile);

    if (assetId === asset.id) {
      return true;
    }
  }
}

function* watchForUploadSettle(asset) {
  while (true) {
    const { payload } = yield take(actions.updateNewFileStatus);
    const { id, state } = payload;

    if (
      id === asset.id &&
      (state === UploadingStatus.UPLOAD_SUCCEEDED || state === UploadingStatus.UPLOAD_FAILED)
    ) {
      return true;
    }
  }
}

function* uploadFileWorker(asset) {
  const uploadTask = yield fork(uploadSingleFileTask, asset);

  const [settled, cancelled, allCancelled] = yield race([
    call(watchForUploadSettle, asset),
    call(watchForUploadCancellation, asset),
    take(actions.cancelUploadingAllFiles),
  ]);

  if (cancelled || allCancelled) {
    yield cancel(uploadTask);
  }
}

function* handleUploadFiles({ payload }) {
  const assets = payload;

  yield all(assets.map((asset) => call(uploadFileWorker, asset)));
}

export default function* root(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(actions.uploadFiles, handleUploadFiles);
}
