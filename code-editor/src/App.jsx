import { useState } from "react";
import "./App.css";


const App = () => {
  const [html, setHtmlCode] = useState("");
  const [css, setCssCode] = useState("");
  const [js, setJsCode] = useState("");

  const runCode = () => {
    const iframe = document.getElementById("output");
    iframe.contentDocument.body.innerHTML = 
    html + "<style>" + css + "</style>" ;
    iframe.contentWindow.eval(js);
  };
  return (
    <div className="playground">
      <div className="left">
        <div className="l1">
          <lable>HTML</lable>
          <textarea
            name="html"
            onChange={(e) => setHtmlCode(e.target.value)}
          ></textarea>
        </div>
        <div className="l1">
          <lable>CSS</lable>
          <textarea
            name="css"
            onChange={(e) => setCssCode(e.target.value)}
          ></textarea>
        </div>
        <div className="l1">
          <lable>JS</lable>
          <textarea
            name="js"
            onChange={(e) => setJsCode(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="right">
        <button onClick={runCode}>Test</button>
        <iframe id="output"></iframe>
      </div>
    </div>
  );
};

export default App;
