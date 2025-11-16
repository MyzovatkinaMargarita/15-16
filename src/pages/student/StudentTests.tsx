import { Link } from "react-router-dom";
export default function StudentTests() {
  const tests = [
    { id: 1, title: "Основы JavaScript" },
    { id: 2, title: "React компоненты" },
  ];
  return (
    <>
      <h2>Список тестов</h2>
      <ul>
        {tests.map(t => (
          <li key={t.id}>
            <Link to={`/student/test/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
