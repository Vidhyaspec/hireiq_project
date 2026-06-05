import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mockinterview.css";

export default function MockInterview() {

  const navigate = useNavigate();

  const questions = [
    {
      question: "Explain REST API in full stack development.",
      keywords: ["api", "http", "request", "response", "json", "backend"]
    },
    {
      question: "What is React and why is it used?",
      keywords: ["component", "ui", "virtual dom", "frontend", "javascript"]
    },
    {
      question: "Difference between SQL and NoSQL databases.",
      keywords: ["table", "mongodb", "mysql", "database", "schema"]
    },
    {
      question: "Explain authentication in web applications.",
      keywords: ["login", "jwt", "token", "security", "password"]
    },
    {
      question: "What is state management in React?",
      keywords: ["state", "props", "useState", "redux", "data"]
    },
    {
      question: "Explain frontend and backend connection.",
      keywords: ["axios", "api", "request", "server", "client"]
    },
    {
      question: "What is Node.js?",
      keywords: ["javascript", "server", "backend", "runtime"]
    },
    {
      question: "Explain responsive web design.",
      keywords: ["mobile", "media query", "responsive", "css", "screen"]
    },
    {
      question: "What is the purpose of Git and GitHub?",
      keywords: ["version", "repository", "commit", "push", "code"]
    },
    {
      question: "Explain CRUD operations.",
      keywords: ["create", "read", "update", "delete", "database"]
    }
  ];

  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [finished, setFinished] = useState(false);

  // RANDOM QUESTION
  const getRandomQuestion = () => {

    let remaining = questions.filter(
      (q) => !usedQuestions.includes(q.question)
    );

    if (remaining.length === 0) {
      remaining = questions;
      setUsedQuestions([]);
    }

    const random =
      remaining[
        Math.floor(Math.random() * remaining.length)
      ];

    setCurrentQuestion(random);

    setUsedQuestions((prev) => [
      ...prev,
      random.question
    ]);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  // NEXT QUESTION
  const nextQuestion = () => {

    if (!answer.trim()) {
      alert("Please answer the question");
      return;
    }

    let marks = 0;

    currentQuestion.keywords.forEach((word) => {

      if (
        answer.toLowerCase().includes(word.toLowerCase())
      ) {
        marks += 20;
      }

    });

    if (marks > 100) marks = 100;

    setScore((prev) => prev + marks);

    setAnswer("");

    if (questionNumber >= 5) {
      setFinished(true);
    } else {
      setQuestionNumber((prev) => prev + 1);
      getRandomQuestion();
    }
  };

  // RESTART INTERVIEW
  const restartInterview = () => {

    setScore(0);
    setQuestionNumber(1);
    setFinished(false);
    setAnswer("");
    setUsedQuestions([]);
    getRandomQuestion();
  };

  return (

    <div className="mock-page">

      <div className="mock-card">

        {!finished ? (

          <>
            <div className="top-section">

              <div className="question-count">
                Question {questionNumber}/5
              </div>

              <div className="live-badge">
                LIVE INTERVIEW
              </div>

            </div>

            <h1 className="mock-title">
              AI Mock Interview
            </h1>

            <div className="question-box">
              {currentQuestion?.question}
            </div>

            <textarea
              className="answer-box"
              rows="7"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              className="next-btn"
              onClick={nextQuestion}
            >
              Next Question
            </button>

          </>
        ) : (

          <div className="result-section">

            <h1 className="result-title">
              Interview Completed 🎉
            </h1>

            <div className="score-circle">
              {Math.round(score / 5)}%
            </div>

            <p className="result-text">
              Great attempt! Keep improving your communication and technical skills.
            </p>

            <div className="result-buttons">

              <button
                className="retry-btn"
                onClick={restartInterview}
              >
                Start New Interview
              </button>

              {/* ✅ FIXED NAVIGATION */}
              <button
                className="retry-btn"
                onClick={() => navigate("/dashboard")}
              >
                Back To Dashboard
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}