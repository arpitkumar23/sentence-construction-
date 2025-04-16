import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import axios from 'axios';

const FillInTheBlanks = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        const questionsData = response.data.questions;
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }
    const countdown = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    setSelectedWords([]);
    setTimer(30);
  }, [currentIndex]);

  const currentQuestion = () => questions[currentIndex] || {};

  const handleWordSelect = (word) => {
    if (
      selectedWords.length < currentQuestion().correctAnswer?.length &&
      !selectedWords.includes(word)
    ) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleBlankClick = (index) => {
    const newWords = [...selectedWords];
    newWords.splice(index, 1);
    setSelectedWords(newWords);
  };

  const handleNext = () => {
    const selected = selectedWords.length ? selectedWords : 'Not Attempted';
    const nextAnswers = [...answers, { selected }];

    if (currentIndex === questions.length - 1) {
      navigate('/feedback', {
        state: { answers: nextAnswers, questions },
      });
    } else {
      setAnswers(nextAnswers);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = [...answers, {
      selected: selectedWords.length ? selectedWords : 'Not Attempted',
    }];
    navigate('/feedback', {
      state: { answers: finalAnswers, questions },
    });
  };

  const isNextDisabled =
    selectedWords.length !== currentQuestion().correctAnswer?.length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-lg md:text-xl font-bold">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <span className="text-red-500 font-semibold">Time left: {timer}s</span>
        </div>
 
        <p className="text-lg md:text-xl mb-6 flex flex-wrap justify-center gap-2 text-center">
          {(() => {
            const question = currentQuestion().question || '';
            const blankCount = currentQuestion().correctAnswer?.length || 0;
            const segments = question.split('_____________');
            const elements = [];

            for (let i = 0; i < segments.length; i++) {
              elements.push(<span key={`text-${i}`}>{segments[i]}</span>);

              if (i < blankCount) {
                const selected = selectedWords[i] || '________';
                elements.push(
                  <span
                    key={`blank-${i}`}
                    onClick={() => handleBlankClick(i)}
                    className="px-3 py-1 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold"
                  >
                    {selected}
                  </span>
                );
              }
            }

            return elements;
          })()}
        </p>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {currentQuestion().options?.map((option) => (
            <Button
              key={option}
              disabled={selectedWords.includes(option)}
              onClick={() => handleWordSelect(option)}
              className={`w-full ${
                selectedWords.includes(option)
                  ? 'opacity-40 cursor-not-allowed'
                  : ''
              }`}
            >
              {option}
            </Button>
          ))}
        </div>
 
        <div className="text-center">
          {currentIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isNextDisabled}
              className={`w-full sm:w-auto px-6 py-2 rounded ${
                isNextDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-full sm:w-auto px-6 py-2 rounded ${
                isNextDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlanks;
