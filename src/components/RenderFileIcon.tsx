import { extensionIconPaths } from "../constants";
import IconImg from "./IconImg";
import FileIcon from "./SVG/File";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}



const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();

  if (
    extension &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extension]}-open.svg`
        : `${extensionIconPaths[extension]}.svg`
      : `${ extensionIconPaths[ extension ]}.svg`;
    
    return <IconImg src={iconPath} />
  }
  if (isFolder)
    return isOpen ? (
      <IconImg src="/public/icons/folder-default-open.svg" />
    ) : (
      <IconImg src="/public/icons/folder-default.svg" />
    );

  return <FileIcon />;
};

export default RenderFileIcon;
