// src/App.tsx
import axios from "axios";
import { useEffect, useState } from "react";

function Ping() {
  const [pythonMsg, setPythonMsg] = useState<string>("");
  const [laravelMsg, setLaravelMsg] = useState<string>("");

  useEffect(() => {
    // Python API test
    axios
      .get("/api/python/ping", { withCredentials: true })
      .then((res) => setPythonMsg(res.data.message))
      .catch((err) => console.error("Python API error", err));

    // Laravel API test
    axios
      .get("/api/ping", { withCredentials: true })
      .then((res) => setLaravelMsg(res.data.message))
      .catch((err) => console.error("Laravel API error", err));
  }, []);

  return (
    <div>
      <div>Python Server says: {pythonMsg || "Loading..."}</div>
      <div>Laravel Server says: {laravelMsg || "Loading..."}</div>
    </div>
  );
}

export default Ping;
