export default function Completed({ score, questions }) {
  return (
    <div className="pb-20 md:pb-0 h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Congratulations!</h1>
      <h2 className="text-xl mb-4">You have completed the quiz</h2>
      <h2 className="mb-2">Your score is</h2>
      <h1 className="text-8xl mb-8">
        {Math.round((score / questions) * 100)}%
      </h1>
      <h2 className="text-xl text-center px-10 md:px-0">
        You answered {score} out of {questions} questions correctly
      </h2>
    </div>
  );
}
