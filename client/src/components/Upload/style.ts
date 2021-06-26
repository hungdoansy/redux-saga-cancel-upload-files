import css from "styled-jsx/css";

const style = css`
  .container {
    width: 600px;
    height: 350px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #c8dadf;
    outline: 2px dashed #92b0b3;
    outline-offset: -10px;
    border-radius: 8px;
  }

  .browseFilesLabel {
    font-size: 1.5rem;
    font-weight: 500;

    margin-right: 8px;
  }
  .browseFilesLabel:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .dropFilesText {
    font-size: 1.5rem;
  }

  .fileInput {
    display: none;
  }
`;

export default style;
