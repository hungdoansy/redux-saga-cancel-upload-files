/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { UploadingStatus } from "models";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { actions } from "slices/upload";

const HintSection: React.FC = () => {
  const dispatch = useDispatch();
  const shouldDisableCancelAllButton = useSelector((state: RootState) => {
    return state.uploadReducer.newFiles.every(
      (file) => file.status !== UploadingStatus.UPLOAD_ONGOING
    );
  });

  const handleClickCancelAllButton = () => {
    if (shouldDisableCancelAllButton) {
      return;
    }

    dispatch(actions.cancelUploadingAllFiles());
  };

  const handleClickResetButton = () => {
    dispatch(actions.reset());
  };

  return (
    <div className="hintInfo">
      <div className="buttonContainer">
        <div className="textButton" onClick={handleClickResetButton}>
          Reset
        </div>

        <div className="textButton" onClick={handleClickCancelAllButton}>
          Cancel All
        </div>
      </div>

      <div className="hint">
        <i>Tips: Open Network/XHR</i>
      </div>

      <style jsx>{`
        .hintInfo {
          width: 100%;

          display: flex;
          justify-content: space-between;

          margin-top: 16px;
        }

        .buttonContainer {
          display: flex;
          column-gap: 32px;
        }

        .textButton:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        .hint {
          text-decoration: italic;
        }
      `}</style>
    </div>
  );
};

export default HintSection;
