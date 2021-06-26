/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";

const CancelButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="cancelButton" onClick={onClick}>
      <svg width="25" height="25" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.75 18C14.3063 18 18 14.3063 18 9.75C18 5.19365 14.3063 1.5 9.75 1.5C5.19365 1.5 1.5 5.19365 1.5 9.75C1.5 14.3063 5.19365 18 9.75 18ZM6.12314 6.12314C6.42063 5.82565 6.90295 5.82565 7.20044 6.12314L9.75002 8.67273L12.2996 6.12314C12.5971 5.82565 13.0794 5.82565 13.3769 6.12314C13.6744 6.42063 13.6744 6.90295 13.3769 7.20044L10.8273 9.75002L13.3769 12.2996C13.6744 12.5971 13.6744 13.0794 13.3769 13.3769C13.0794 13.6744 12.5971 13.6744 12.2996 13.3769L9.75002 10.8273L7.20044 13.3769C6.90295 13.6744 6.42063 13.6744 6.12314 13.3769C5.82565 13.0794 5.82565 12.5971 6.12314 12.2996L8.67273 9.75002L6.12314 7.20044C5.82565 6.90295 5.82565 6.42063 6.12314 6.12314Z" />
      </svg>

      <style jsx>{`
        .cancelButton {
          color: #4c4c6d;
        }
      `}</style>
    </div>
  );
};

export default CancelButton;
