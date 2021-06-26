import React, { useRef } from "react";

import style from "./style";

const Upload: React.FC = () => {
  const fileInputRef = useRef(null);

  const handleChooseFiles = (e) => {
    if (!(e.target.files?.length > 0)) {
      return;
    }

    const files = Array.from(e.target.files) as File[];

    console.log("Files", files);
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
