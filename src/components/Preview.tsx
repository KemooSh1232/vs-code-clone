import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import type { RootState } from "../app/store";
import OpenedFilesBar from "./OpenedFilesBar";

const Preview = () => {
  const { clickedFile } = useSelector((state: RootState) => state.tree);
  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighlighter content={clickedFile.fileContent} />
    </>
  );
};

export default Preview;
