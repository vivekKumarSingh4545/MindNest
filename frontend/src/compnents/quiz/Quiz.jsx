import React, { useState } from 'react';
import Loader from 'react-js-loader';
import Navbar from '../navbar/Navbar';

const questions = [
  "How often have you felt down, depressed, or hopeless in the past two weeks?",
  "How often do you feel little interest or pleasure in doing things?",
  "How often do you feel nervous, anxious, or on edge?",
  "How often do you have trouble relaxing?",
  "How often do you feel so restless that it is hard to sit still?",
  "How often do you feel fatigued or have little energy?",
  "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?",
  "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?",
  "How often do you feel afraid, as if something awful might happen?",
  "How often do you have trouble falling or staying asleep, or sleeping too much?",
  "How often do you feel easily annoyed or irritable?",
  "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?",
  "How often do you feel disconnected or detached from reality or your surroundings?",
  "How often do you find it difficult to control your worry?",
  "How often do you avoid social situations due to fear of being judged or embarrassed?",
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleOptionHover = (index) => setHoveredOption(index);
  const handleOptionLeave = () => setHoveredOption(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, questions }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="max-w-4xl mx-auto p-6"
        style={{
          background: 'linear-gradient(to right, #D1D5DB, #E5E7EB, #F3F4F6)',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          marginTop: '6rem'
        }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Mental Health Quiz</h1>

        {questions.map((question, index) => (
          <div key={index} className="mb-4 text-black font-bold m-12">
            <p className="mb-2 text-lg">{`${index + 1}. ${question}`}</p>
            <div className="flex flex-col space-y-2">
              {options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center p-3 px-5 block cursor-pointer rounded-full border border-black border-opacity-20 ${hoveredOption === index ? 'hover:bg-black hover:text-white' : 'hover:bg-gray-200'}`}
                  onMouseEnter={() => handleOptionHover(index)}
                  onMouseLeave={handleOptionLeave}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleChange(index, option)}
                    className="accent-primary"
                  />
                  <span className="ps-3 text-lg font-normal">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 w-half bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors duration-300 ml-72"
        >
          Submit
        </button>

        {loading ? (
          <div className="flex justify-center mt-6">
            <Loader type="spinner-cub" bgColor={"#000000"} color={"#FFFFFF"} title={"spinner-cub"} size={100} />
          </div>
        ) : (
          result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
              <p className="whitespace-pre-wrap">{result}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Quiz;
