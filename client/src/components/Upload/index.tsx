import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { actions } from "slices/upload";
import { NewFile, UploadingStatus } from "models";

import style from "./style";

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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
      <style jsx>{style}</style>
    </div>
  );
};

export default Upload;
