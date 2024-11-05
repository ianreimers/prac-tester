import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Choice, Question } from "../types/apiTypes";

interface Props {
  question: Question;
  onNextQuestion: (selectedChoiceId: number) => void;
}

function hasMultipleAnswers(choices: Choice[]): boolean {
  let count = 0;

  choices.forEach((choice) => {
    if (choice.is_correct) {
      count += 1;
    }
  });

  return count > 1;
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

  /*
    *
            <Button onClick={() => handleChoiceClick(id)}>
            </Button>
    */

  return (
    <>
      <p>{question_text}</p>
      <Form>
        {choices?.map((choice) => {
          const { id, choice_text } = choice;

          return (
            <Form.Check
              id={id.toString()}
              type={hasMultipleAnswers(choices) ? "checkbox" : "radio"}
              onChange={() => handleChoiceClick(id)}
              checked={selectedChoiceId === id}
              name="choices"
              value={id}
              label={choice_text}
            />
          );
        })}
      </Form>
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
