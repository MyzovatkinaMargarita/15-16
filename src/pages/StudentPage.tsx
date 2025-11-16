import { useNavigate } from "react-router-dom";

export default function StudentPage() {
  const navigate = useNavigate();
  function handleOpenTests() {
    navigate("/student/tests");
  }
  return (
    <section style={{ padding: 24 }}>
      <h1>Student</h1>
      <p>Добро пожаловать в личный кабинет студента.</p>
      <button
        onClick={handleOpenTests}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          backgroundColor: "#0E8E86",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Список тестов
      </button>
    </section>
  );
}
