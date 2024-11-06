import { Button } from "react-bootstrap";
import { TestQuestion } from "../types/uiTypes";
import { hasMultipleAnswers } from "../lib/utils";
import { useState } from "react";
import { Choice } from "../types/apiTypes";

interface Props {
  testQuestion: TestQuestion;
  onSubmit: (chosenChoises: number[]) => void;
}

function getChoiceAnswerCount(choices: Choice[]) {
  let count = 0;

  choices.forEach((choice) => {
    if (choice.is_correct) {
      count += 1;
    }
  });

  return count;
}

function CollectionTestQuestion({ testQuestion, onSubmit }: Props) {
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const { groupId, questionId, choices, question_text } = testQuestion;
  const answerCount = getChoiceAnswerCount(choices);

  function handleChoiceChange(choiceId: number) {
    if (!hasMultipleAnswers(choices)) {
      setSelectedChoices([choiceId]);
      return;
    }

    if (hasMultipleAnswers(choices) && selectedChoices.includes(choiceId)) {
      const newSelectedChoices = selectedChoices.filter(
        (id) => id !== choiceId,
      );
      setSelectedChoices(newSelectedChoices);
      return;
    }

    if (hasMultipleAnswers(choices) && selectedChoices.length !== answerCount) {
      setSelectedChoices([...selectedChoices, choiceId]);
    }
  }

  function handleNextQuestionBtnClick() {
    onSubmit([...selectedChoices]);
    setSelectedChoices([]);
  }

  return (
    <>
      <p>{question_text}</p>
      <form className="d-flex flex-column justify-content-around align-items-center">
        {choices?.map((choice) => {
          const { id, choice_text } = choice;

          return (
            <div key={id} className="w-100 form-check" id={id.toString()}>
              <Button
                className="d-flex w-100 mb-3 py-4"
                variant="outline-dark"
                active={selectedChoices.includes(id)}
                onClick={() => handleChoiceChange(id)}
                key={id}
              >
                <input
                  id={id.toString()}
                  className="form-check-input ms-4"
                  checked={selectedChoices.includes(id)}
                  onChange={() => handleChoiceChange(id)}
                  type={hasMultipleAnswers(choices) ? "checkbox" : "radio"}
                />
                <label
                  htmlFor={id.toString()}
                  className="form-check-label ms-5"
                  style={{ cursor: "pointer" }}
                  onClick={undefined}
                >
                  {choice_text}
                </label>
              </Button>
            </div>
          );
        })}
      </form>
      {answerCount === selectedChoices.length ? (
        <Button className="ms-auto" onClick={handleNextQuestionBtnClick}>
          Next Question
        </Button>
      ) : null}
    </>
  );
}

export default CollectionTestQuestion;
