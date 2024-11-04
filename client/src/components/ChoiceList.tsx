import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { type Choice } from "../types/apiTypes";

interface Props {
  choices: Choice[] | undefined;
}

function ChoiceList({ choices }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  function handleBtnClick() {
    setShowAnswer(!showAnswer);
  }

  if (!choices) {
    return <p>There are no choices</p>;
  }

  return (
    <>
      <ListGroup>
        {choices.map((choice) => {
          const { id, choice_text, is_correct } = choice;

          return (
            <ListGroup.Item
              key={id}
              variant={is_correct && showAnswer ? "success" : ""}
            >
              {choice_text}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="pt-3 d-flex align-items-center">
        <Button className="ms-auto" onClick={handleBtnClick}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
      </div>
    </>
  );
}

export default ChoiceList;
