import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import Files from "components/Files";
import { RootState } from "redux/reducer";
import { actions } from "slices/upload";
import { NewFile, UploadingStatus } from "models";

import HintSection from "./HintSection";

import style from "./style";

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const areSomeBeingUploaded = useSelector(
    (state: RootState) => state.uploadReducer.newFiles.length !== 0
  );

  const handleChooseFiles = (e) => {
    if (!(e.target.files?.length > 0)) {
      return;
    }

    const files = Array.from(e.target.files) as File[];

    const newFiles: NewFile[] = files.map((file) => ({
      id: uuid(),
      name: file.name,
      objectUrl: window.URL.createObjectURL(file),
      status: UploadingStatus.UPLOADNG_PENDING,
    }));

    console.log("Files", newFiles);

    dispatch(actions.uploadFiles(newFiles));
  };

  return (
    <div className="container">
      <div className="introText">Cancel uploading files with Redux-saga and Axios</div>

      {areSomeBeingUploaded ? (
        <Files />
      ) : (
        <div className="uploadContainer">
          <span className="texts">
            <label htmlFor="fileInput">
              <span className="browseFilesLabel">Browser files</span>
            </label>

            <span className="dropFilesText">or drop them here</span>
          </span>

          <input
            onChange={handleChooseFiles}
            ref={fileInputRef}
            id="fileInput"
            className="fileInput"
            type="file"
            multiple
          />
        </div>
      )}

      <HintSection />

      <style jsx>{style}</style>
    </div>
  );
};

export default Upload;
