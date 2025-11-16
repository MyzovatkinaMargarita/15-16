import { useParams } from "react-router-dom";
export default function StudentTestPage() {
  const { id } = useParams();
  return <h2>Тест №{id}</h2>;
}
