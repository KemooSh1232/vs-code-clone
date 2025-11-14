import { useEffect, useRef } from "react";
import { setClickedAction, setOpenFilesAction } from "../../app/features/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface IProps {
  postion: {
    x: number;
    y: number;
  };
  setShowMenu: (val: boolean) => void;
}

const ContextMenu = ({ postion: { x, y }, setShowMenu }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event?.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  const { openedFile, tabIdToRemove } = useSelector(
    (state: RootState) => state.tree
  );
  // ** Handler

  const dispatch = useDispatch();
  const onClose = () => {
    const filterd = openedFile.filter((el) => el.id !== tabIdToRemove);
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
    setShowMenu(false)
  };
  const OnCloseAll = () => {
    dispatch(setOpenFilesAction([]));
    setShowMenu(false)
  };
  return (
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-fit px-6 py-1 space-y-1 rounded-mdhover:bg-gray-300 transition-all"
        style={{ position: "absolute", left: x, top: y }}
      >
        <li className="cursor-pointer" onClick={onClose}>
          Close
        </li>
        <li className="cursor-pointer" onClick={OnCloseAll}>
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
