import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NewFile, UploadingStatus } from "models";
interface State {
  newFiles: NewFile[];
}

const initialState: State = {
  newFiles: [],
};

const UploadSlice = createSlice({
  name: "UploadSlice",
  initialState,
  reducers: {
    uploadFiles: (state, action: PayloadAction<NewFile[]>) => {
      state.newFiles = action.payload;
    },
    updateNewFileStatus: (
      state,
      action: PayloadAction<{ id: string; status: UploadingStatus }>
    ) => {
      const file = state.newFiles.find((file) => file.id === action.payload.id);

      if (file) {
        file.status = action.payload.status;
      }
    },
    cancelUploadingFile: (state, action: PayloadAction<string>) => {
      const file = state.newFiles.find((file) => file.id === action.payload);

      if (file && file.status === UploadingStatus.UPLOAD_ONGOING) {
        file.status = UploadingStatus.UPLOAD_CANCELLED;
      }
    },
    cancelUploadingAllFiles: (state) => {
      state.newFiles.forEach((file) => {
        if (file.status === UploadingStatus.UPLOAD_ONGOING) {
          file.status = UploadingStatus.UPLOAD_CANCELLED;
        }
      });
    },
    reset: (state) => {
      state.newFiles = [];
    },
  },
});

const { reducer, actions } = UploadSlice;

export { reducer, actions };
