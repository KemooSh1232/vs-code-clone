import type { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface IProps {
  defaultLayout?: number[] | undefined;
  leftPanal: ReactNode;
  rightPanal: ReactNode;
  showLeftPanal: boolean
}

const ResizablePanal = ({ defaultLayout = [33, 67], leftPanal, rightPanal, showLeftPanal }: IProps) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  return (
    <PanelGroup direction="horizontal" onLayout={onLayout} autoSaveId="condition">
      {showLeftPanal && (
        <>
          <Panel defaultSize={defaultLayout[0]} collapsible>{leftPanal}</Panel>
          <PanelResizeHandle className="border-r border-[#555]" />
        </>
      )}
      <Panel defaultSize={defaultLayout[1]}>{rightPanal}</Panel>
    </PanelGroup>
  );
};

export default ResizablePanal;
