import { useDispatch, useSelector } from "react-redux";
import type { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import {
  setClickedAction,
  setOpenFilesAction,
  setTabIdToRemoveAction,
} from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const {
    openedFile,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);

  const dispatch = useDispatch();
  // Handler
  const onClick = () => {
    const { name, content } = file;
    dispatch(
      setClickedAction({
        filename: name,
        fileContent: content,
        activeTabId: file.id,
      })
    );
  };
  const onRemove = (selectedId: string) => {
    const filterd = openedFile.filter((el) => el.id !== selectedId);
    const lastTab = filterd[filterd.length - 1];
    if (!lastTab) {
      dispatch(setOpenFilesAction([]));
      dispatch(
        setClickedAction({ activeTabId: null, fileContent: "", filename: "" })
      );
      return;
    }
    const { id: lastId, name: lastName, content: lastContent } = lastTab;
    dispatch(setOpenFilesAction(filterd));
    dispatch(
      setClickedAction({
        activeTabId: lastId,
        filename: lastName,
        fileContent: lastContent,
      })
    );
  };
  return (
    <div
      className={`flex items-center gap-3 p-2 border-t-2 ${
        file.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      }`}
      onClick={ onClick }
      onContextMenu={ ( e ) =>
      {
        e.preventDefault()
        dispatch(setTabIdToRemoveAction(file.id))
      }}

    >
      <div className="flex gap-1 items-center">
        <span>
          <RenderFileIcon filename={file.name} />
        </span>
        <span>{file.name}</span>
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
