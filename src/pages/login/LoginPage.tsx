import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ...псевдопроверка данных
    navigate("/student", { replace: true });
  }
  return (
    <form onSubmit={handleSubmit} style={{ display:"grid", gap:12, maxWidth:320 }}>
      <input placeholder="Email" />
      <input type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  );
}
