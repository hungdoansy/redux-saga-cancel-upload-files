import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

import FileView from "./FileView";
import style from "./style";

const Files: React.FC = () => {
  const newFileIds = useSelector((state: RootState) =>
    state.uploadReducer.newFiles.map((file) => file.id)
  );

  return (
    <div className="filesContainer">
      {newFileIds.map((id) => (
        <FileView key={id} id={id} />
      ))}
      <style jsx>{style}</style>
    </div>
  );
};

export default Files;
