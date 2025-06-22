import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PlainHtml from "./pages/PlainHtml";
// さらに他のページもここでimport

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plain" element={<PlainHtml />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
