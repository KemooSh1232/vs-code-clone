import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import { useState } from "react";
import ContextMenu from "./ui/ContextMenu";
// interface IProps {}

const OpenedFilesBar = (/*{}: IProps */) => {
  const { openedFile } = useSelector((state: RootState) => state.tree);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [postionMenu, setPostionMenu] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div className="flex flex-col">
      <div
        className="flex gap-1"
        onContextMenu={(e) => {
          e.preventDefault();
          setShowMenu(true);
          setPostionMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        {openedFile.map((file) => (
          <OpenedFilesBarTab key={file.id} file={file} />
        ))}
      </div>
      {showMenu && (
        <ContextMenu postion={postionMenu} setShowMenu={() => setShowMenu(false)} />
      )}
    </div>
  );
};

export default OpenedFilesBar;
