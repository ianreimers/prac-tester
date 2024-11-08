import { Card, ListGroup } from "react-bootstrap";
import { TestQuestion } from "../types/uiTypes";

interface Props {
  testQuestion: TestQuestion;
}

function TestResult({ testQuestion }: Props) {
  const { question_text, chosenChoiceIds, questionId, choices, groupId } =
    testQuestion;

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Header>{question_text}</Card.Header>
      <Card.Body>
        <ListGroup>
          {choices.map((choice) => {
            const { id, choice_text, is_correct } = choice;
            let variantColor: string = "";

            if (is_correct) {
              variantColor = "success";
            }

            if (!is_correct && chosenChoiceIds.includes(id)) {
              variantColor = "danger";
            }

            return (
              <ListGroup.Item key={id} variant={variantColor}>
                {choice_text}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default TestResult;
