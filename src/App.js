import { useState } from "react";
import Completed from "./Completed";
import Question from "./Question";
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

  return (
    <div className="App">
      {completed ? (
        <Completed score={score} questions={QUESTIONS.length} />
      ) : (
        <div className="flex justify-center bg-gradient-to-r from-emerald-400 to-pink-500">
          <div className="max-w-lg">
            {QUESTIONS.map((question, index) => (
              <Question
                active={active}
                index={index}
                total={QUESTIONS.length}
                question={question}
                handleClick={handleClick}
                handleNext={handleNext}
                showNext={showNext}
                selected={selected}
                response={response}
                score={score}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
