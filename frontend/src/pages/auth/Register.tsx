import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from "../../api";
import Cookies from "js-cookie";

interface RegisterFormProps {
  onRegister?: (user: any) => void;
}

interface FormState {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register({ onRegister }: RegisterFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    zipcode: "",
    address: "",
  });
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post("/api/register", form);
      setResult(res.data.message || "登録成功");
      if (onRegister) onRegister(res.data.user);
      // ここでリダイレクトや状態管理など
    } catch (err: any) {
      if (err.response && err.response.status === 422) {
        // バリデーションエラー
        console.log(err.response.data.errors);
        // 例：errors.email や errors.password に配列でエラーメッセージが格納
        setError(err.response.data.errors); // 状態で保存
      } else {
        setError({ message: err.response?.data?.message ?? "登録失敗" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新規登録</h2>
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="名前"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="メール"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="パスワード"
        required
      />

      <button type="submit">登録</button>
      {error && typeof error === "object" && (
        <ul>
          {Object.entries(error).map(([field, messages]) =>
            (messages as string[]).map((msg, i) => (
              <li key={field + i}>{msg}</li>
            ))
          )}
        </ul>
      )}
      {error && typeof error === "string" && <p>{error}</p>}
      {result && <p>{result}</p>}
    </form>
  );
}
