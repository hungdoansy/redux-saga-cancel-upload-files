/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/reducer";
import { actions } from "slices/upload";
import { UploadingStatus } from "models";

import DocumentIcon from "./DocumentIcon";
import CancelButton from "../CancelButton";

const FileView: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();

  const file = useSelector((state: RootState) =>
    state.uploadReducer.newFiles.find((file) => file.id === id)
  );

  if (!file) {
    return null;
  }

  const handleClickCancelButton = () => {
    dispatch(actions.cancelUploadingFile(id));
  };

  return (
    <div className="fileViewContainer">
      <div className="fileView">
        <div className="iconWrapper">
          <DocumentIcon />
        </div>
        <div className="infoSection">
          <div>{file.name}</div>
          <div>{file.status}</div>
        </div>

        {file.status === UploadingStatus.UPLOAD_ONGOING && (
          <div className="cancelButtonContainer">
            <CancelButton onClick={handleClickCancelButton} />
          </div>
        )}
      </div>
      <style jsx>{`
        .fileViewContainer {
          width: 100%;
          padding: 8px;
        }
        .fileViewContainer:hover {
          background-color: #dddddd;
        }

        .fileView {
          height: 40px;
          position: relative;

          display: flex;
          align-items: center;

          column-gap: 8px;
        }

        .iconWrapper {
          width: 40px;
          height: 40px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 8px;

          background-color: rgba(146, 176, 179, 0.3);
        }

        :global(.documentIcon) {
          color: #4c4c6d;
        }

        .infoSection {
          flex: 1 1;
          height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          justify-content: space-evenly;
        }

        .cancelButtonContainer {
          position: absolute;

          top: 50%;
          transform: translateY(-50%);
          right: 0;

          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default FileView;
