import { useState } from "react";
import { Button } from "react-bootstrap";
import { Question } from "../types/apiTypes";

interface Props {
  question: Question;
  onNextQuestion: (selectedChoiceId: number) => void;
}

function TestQuestion({ question, onNextQuestion }: Props) {
  const [selectedChoiceId, setSelectedChoiceId] = useState(-1);
  const { choices, question_text } = question;

  function handleChoiceClick(choiceId: number) {
    if (choiceId === selectedChoiceId) {
      return;
    }

    setSelectedChoiceId(choiceId);
  }

  function handleNextQuestionButtonClick() {
    onNextQuestion(selectedChoiceId);
    setSelectedChoiceId(-1);
  }

  return (
    <>
      <p>{question_text}</p>
      {choices?.map((choice) => {
        const { id, choice_text } = choice;

        return (
          <Button
            key={id}
            variant="light"
            className={`d-block w-100 my-3 py-3 ${selectedChoiceId === id ? "active" : ""}`}
            onClick={() => handleChoiceClick(id)}
          >
            {choice_text}
          </Button>
        );
      })}
      <div className="d-flex">
        {selectedChoiceId > 0 ? (
          <Button className="ms-auto" onClick={handleNextQuestionButtonClick}>
            Next Question
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default TestQuestion;
