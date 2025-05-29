import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlainHtml from "./pages/PlainHtml";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plain" element={<PlainHtml />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
