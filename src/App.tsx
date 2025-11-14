import "./App.css";
import { fileTree } from "./data/FileTree";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizablePanal from "./components/ResizablePanal";
import Preview from "./components/Preview";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";
import WelcomeTab from "./components/WelcomeTab";
function App() {
  const { openedFile } = useSelector(({tree}: RootState) => tree);
  return (
    <div className="">
      <ResizablePanal
        showLeftPanal
        leftPanal={
          <div className="h-screen pt-4">
            <RecursiveComponent fileTree={ fileTree } />
          </div>
        }
        rightPanal={
          <div className="">
            { openedFile.length ? 
            <Preview /> : <WelcomeTab />
            }
          </div>
        }
      />
    </div>
  );
}

export default App;
