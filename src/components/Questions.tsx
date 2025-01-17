import { useNavigate } from "react-router-dom";
import QuizModal from "./QuizModal";
import React, { MouseEventHandler, useEffect } from "react";

interface QuizQuestion {
  message: string;
  points: number;
  chosenAnswer: string;
  correct: boolean;
  displayExplanation: string;
  showReference: string;
  nextQuestion: MouseEventHandler;
  show: boolean;
}

interface QuizProps {
  currQuestion: { Question: string };
  questionNumber: number;
  totalQuestions: number;
  modalProps: QuizQuestion;
  chooseAnswer: boolean;
  points: number;
  choicesArr: string[][];
  selectedOption: string;
  selectOption: (option: string) => void;
  checkAnswer: () => void;
}

const Questions: React.FC<QuizProps> = QuizProps => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!QuizProps.choicesArr.length) {
      navigate("/quizzes");
    }
  }, [QuizProps.choicesArr]);
  return (
    <>
      <div className="quiz-text">
        <p>
          Question: {QuizProps.questionNumber}/{QuizProps.totalQuestions}
        </p>
        <p>Points: {QuizProps.points}</p>
      </div>
      <h1 className="quiz-heading">Question {QuizProps.questionNumber}</h1>
      <div className="quiz-div">
        {QuizProps.chooseAnswer ? (
          <QuizModal {...QuizProps.modalProps} />
        ) : (
          <fieldset className="quiz-answers-div">
            <legend>
              <span className="sr-only">
                Question {QuizProps.questionNumber}
              </span>
              {QuizProps.currQuestion.Question}
            </legend>
            <ul>
              {QuizProps.choicesArr.length > 0 &&
                QuizProps.choicesArr[QuizProps.questionNumber - 1].map(
                  (choice: string, index: number) => (
                    <li key={index}>
                      <button
                        className={`answers-btns ${choice === QuizProps.selectedOption ? `answers-btns--selected` : ``}`}
                        onClick={() => QuizProps.selectOption(choice)}
                      >
                        {choice}
                      </button>
                    </li>
                  )
                )}
            </ul>
            <hr />
            <button
              className="select-btns submit-btn"
              style={{ opacity: QuizProps.selectedOption ? 1 : 0.5 }}
              onClick={() => QuizProps.checkAnswer()}
            >
              Submit
            </button>
          </fieldset>
        )}
      </div>
    </>
  );
};
export default Questions;
