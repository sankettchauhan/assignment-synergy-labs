import { useState } from "react";
import Completed from "./Completed";
import QUESTIONS from "./questions.json";

function App() {
  console.table(QUESTIONS);
  const [active, setActive] = useState(1);
  const [response, setResponse] = useState("Correct");
  const [showNext, setShowNext] = useState(false);
  const [selected, setSelected] = useState("");
  // stores number of correct answers
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleClick = (selected, correct) => {
    if (selected === correct) {
      setScore((oldScore) => oldScore + 1);
      setResponse("Correct!");
    } else {
      setResponse("Incorrect.");
      setSelected(selected);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    setResponse("Correct");
    setActive((active) => active + 1);
    setShowNext(false);
    setSelected("");
    if (active === QUESTIONS.length) setCompleted(true);
  };

  const correctAnswerClasses = "bg-green-500";
  const selectedAnswerClasses = "bg-red-500";

  return (
    <div className="App">
      {completed ? (
        <Completed score={score} questions={QUESTIONS.length} />
      ) : (
        <div className="flex justify-center">
          <div className="max-w-lg">
            {QUESTIONS.map((question, index) => (
              <div
                className={`${active === index + 1 ? "h-screen" : "hidden"} `}
                key={`question-${index}`}
              >
                <div
                  className="bg-black/25 h-3"
                  style={{
                    width: `${Math.round(
                      ((index + 1) / QUESTIONS.length) * 100
                    )}%`,
                  }}
                />
                <div className="question px-16 w-[450px]">
                  <h1 className="mt-8 text-2xl mb-2">
                    Question {index + 1} of {QUESTIONS.length}
                  </h1>
                  <h2 className="opacity-60">
                    {decodeURIComponent(question.category)}
                  </h2>
                  <div className="opacity-70 leading-3 mb-8">
                    &#9733;
                    {question.difficulty === "hard" ? (
                      <>&#9733;&#9733;</>
                    ) : question.difficulty === "medium" ? (
                      <>&#9733;&#9734;</>
                    ) : (
                      <>&#9734;&#9734;</>
                    )}
                    &#9734;&#9734;
                  </div>
                  <h2 className="text-xl font-light mb-4">
                    {decodeURIComponent(question.question)}
                  </h2>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {question.incorrect_answers
                      .concat(question.correct_answer)
                      .sort()
                      .map((option, index) => (
                        <button
                          key={`option-${index + 1}`}
                          onClick={() =>
                            handleClick(option, question.correct_answer)
                          }
                          disabled={showNext}
                          className={`${
                            showNext &&
                            (option === question.correct_answer
                              ? correctAnswerClasses
                              : option === selected
                              ? selectedAnswerClasses
                              : "opacity-50")
                          } text-lg font-thin border-[1px] py-2`}
                        >
                          {decodeURIComponent(option)}
                        </button>
                      ))}
                  </div>
                  <h1
                    className={`${
                      showNext ? "" : "invisible"
                    } text-center text-red-700 font-semibold text-xl`}
                  >
                    {response}
                  </h1>
                  <div className="text-center">
                    <button
                      onClick={() => handleNext()}
                      className={`${
                        showNext ? "" : "invisible"
                      } border-[1px] py-2 px-4 hover:bg-black/20 mt-4`}
                    >
                      Next Question
                    </button>
                  </div>
                  <div className="flex justify-between w-full mt-16">
                    <div>
                      Score: {Math.round((score / QUESTIONS.length) * 100)}%
                    </div>
                    <div>
                      Max Score:{" "}
                      {Math.round(((index + 1) / QUESTIONS.length) * 100)}%
                    </div>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute bg-black/50 h-5"
                      style={{
                        width: `${Math.round(
                          (score / QUESTIONS.length) * 100
                        )}%`,
                      }}
                    />
                    <div
                      className="absolute bg-black/25 h-5"
                      style={{
                        width: `${Math.round(
                          (index / QUESTIONS.length) * 100
                        )}%`,
                      }}
                    />
                    <div
                      className="absolute bg-black/10 h-5 z-1"
                      style={{
                        width: `${Math.round(
                          ((index + 1) / QUESTIONS.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div
                    className="bg-black/25 h-5"
                    style={{
                      width: `${Math.round((score / QUESTIONS.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
