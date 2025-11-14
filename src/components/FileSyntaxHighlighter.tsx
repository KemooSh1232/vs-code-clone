import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
interface IProps {
  content: string | undefined;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <div className="h-screen w-full">
      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        customStyle={{
          backgroundColor: "transparent",
          width: "100%",
          maxHeight: "100%",
          overflowX: "auto",
          fontSize: "1rem",
          padding: 0,
          margin: 0
        }}
        showLineNumbers
      >
        {String(content)}
      </SyntaxHighlighter>
    </div>
  );
};

export default FileSyntaxHighlighter;
