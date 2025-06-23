import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from "../../api";

interface LoginProps {
  onLogin?: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await api.get("/sanctum/csrf-cookie", { withCredentials: true });
      const res = await api.post("/api/login", { email, password });
      if (onLogin) onLogin(res.data.user);
    } catch {
      setError("ログイン失敗");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <form onSubmit={handleLogin}>
      <h2>ログイン１</h2>
      <input
        value={email}
        onChange={handleEmailChange}
        placeholder="メール１２"
        name="email"
        type="email"
        required
      />
      <input
        value={password}
        onChange={handlePasswordChange}
        type="password"
        placeholder="パスワード"
        name="password"
        required
      />
      <button type="submit">ログイン</button>
      {error && <p>{error}</p>}
    </form>
  );
}
