import { useState } from "react";
import type { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedAction, setOpenFilesAction } from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id,  name, isFolder, children, content } = fileTree;
  const dispatch = useDispatch();
  const { openedFile } = useSelector((state: RootState) => state.tree);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  /* ================= Handler ================= */
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const onFileClick = () =>
  {
    const exist = doesFileObjectExist( openedFile, id )
    dispatch(
      setClickedAction({
        filename: name,
        fileContent: content,
        activeTabId: id,
      })
    );
    if ( exist ) return
    dispatch( setOpenFilesAction( [ ...openedFile, fileTree ] ) )
  }

  return (
    <div className="ml-4 cursor-pointer w-fit">
      <div className="flex items-center mb-2">
        {isFolder ? (
          <div className="mr-4 flex items-center gap-0.5" onClick={toggle}>
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            <RenderFileIcon
              filename={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span>{name}</span>
          </div>
        ) : (
          <span
            className="ml-3 flex items-center"
            onClick={onFileClick}
          >
            <RenderFileIcon filename={name} />
            <span className="ml-1">{name}</span>
          </span>
        )}
      </div>
      {isOpen &&
        children &&
        children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
