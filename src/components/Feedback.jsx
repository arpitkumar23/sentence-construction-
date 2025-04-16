import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Feedback = () => {
  const location = useLocation();
  const { answers = [], questions = [] } = location.state || {};

  const calculateScore = () =>
    answers.filter(
      (a, idx) =>
        Array.isArray(a.selected) &&
        JSON.stringify(a.selected) === JSON.stringify(questions[idx].correctAnswer)
    ).length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Feedback</h1>

        <div className="space-y-6">
          {answers.map((a, idx) => {
            const correct = questions[idx].correctAnswer;
            const selected = a.selected;
            const isCorrect =
              Array.isArray(selected) &&
              JSON.stringify(selected) === JSON.stringify(correct);

            return (
              <div key={idx} className="border p-4 rounded shadow-sm bg-gray-50">
                <p className="font-semibold mb-2 text-base sm:text-lg">
                  Q{idx + 1}: {questions[idx].question}
                </p>

                <p className="text-sm sm:text-base mb-1">
                  <strong>Your Answer:</strong>{" "}
                  {selected === 'Not Attempted' ? (
                    <span className="text-red-500">Not Attempted</span>
                  ) : (
                    selected.map((word, i) => {
                      const isWordCorrect = word === correct[i];
                      return (
                        <span
                          key={i}
                          className={`inline-block px-2 py-1 mx-1 my-1 rounded text-sm font-medium ${
                            isWordCorrect
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })
                  )}
                </p>

                {selected !== 'Not Attempted' && !isCorrect && (
                  <p className="text-sm sm:text-base mt-2">
                    <strong>Correct Answer:</strong>{" "}
                    {correct.map((word, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 mx-1 my-1 rounded bg-green-100 text-green-700 text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                )}

                <p
                  className={`mt-2 font-semibold text-sm sm:text-base ${
                    isCorrect
                      ? 'text-green-600'
                      : selected === 'Not Attempted'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {isCorrect
                    ? '✔ Correct'
                    : selected === 'Not Attempted'
                    ? '⚠ Not Attempted'
                    : '✘ Incorrect'}
                </p>
              </div>
            );
          })}
        </div>

        <h2 className="text-lg sm:text-xl font-bold mt-10 text-center">
          Total Score:{" "}
          <span className="text-blue-600">{calculateScore()} / {questions.length}</span>
        </h2>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
          >
            Again Attempt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
