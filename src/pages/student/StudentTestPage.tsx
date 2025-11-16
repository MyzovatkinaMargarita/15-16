/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const QuestionsList = styled.ol`
  display: grid;
  gap: 16px;
  padding-left: 20px;
  margin: 0;
`;

const QuestionCard = styled.li`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
`;

const QuestionText = styled.div`
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.35;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 8px;
  margin: 0;
`;

const OptionLabel = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

const TextAnswerWrapper = styled.div`
  margin-top: 8px;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
`;

type Question = {
  id: number | string;
  testId: number;
  text: string;
  type: "single" | "multiple" | "text";
  options?: string[];
};

export default function StudentTestPage() {
  const { id } = useParams<{ id: string }>();
  const testId = Number(id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (Number.isNaN(testId)) return <p>Неверный ID</p>;
  if (loading) return <p>Загрузка…</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

  const filtered = questions.filter((q) => q.testId === testId);
  if (filtered.length === 0) return <p>Вопросы не найдены</p>;

  const handleTextChange = (id: number | string, value: string) => {
    setTextAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <h2>Тест №{testId}</h2>
      <QuestionsList>
        {filtered.map((q) => (
          <QuestionCard key={q.id}>
            <QuestionText>{q.text}</QuestionText>

            {q.type === "multiple" && (
              <OptionsList>
                {(q.options ?? []).map((opt, idx) => (
                  <li key={idx}>
                    <OptionLabel>
                      <input
                        type="checkbox"
                        aria-label={`Вопрос ${q.id}: вариант ${idx + 1}`}
                      />
                      <span>{opt}</span>
                    </OptionLabel>
                  </li>
                ))}
              </OptionsList>
            )}

            {q.type === "single" && (
              <OptionsList>
                {(q.options ?? []).map((opt, idx) => (
                  <li key={idx}>
                    <OptionLabel>
                      <input                    type="radio"
                        name={`q-${q.id}`} 
                        aria-label={`Вопрос ${q.id}: вариант ${idx + 1}`}
                      />
                      <span>{opt}</span>
                    </OptionLabel>
                  </li>
                ))}
              </OptionsList>
            )}

            {q.type === "text" && (
              <TextAnswerWrapper>
                <TextInput
                  value={textAnswers[q.id] || ""}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder="Введите ваш ответ..."
                  aria-label={`Вопрос ${q.id}: текстовый ответ`}
                />
              </TextAnswerWrapper>
            )}
          </QuestionCard>
        ))}
      </QuestionsList>
    </div>
  );
}


