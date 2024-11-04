import { Accordion, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import ChoiceList from "./ChoiceList";
import { Link, useNavigate } from "react-router-dom";

import { type Group } from "../types/apiTypes";

interface Props {
  group: Group;
}

function GroupAccordion({ group }: Props) {
  const { id, name, questions } = group;

  const decoratedOnClick = useAccordionButton(group.id.toString(), () =>
    console.log("totally custom!"),
  );

  return (
    <Card className="border-0">
      <Card.Header
        className="d-flex"
        onClick={decoratedOnClick}
        style={{ cursor: "pointer" }}
      >
        <h2>{name}</h2>
        <Link to={`test/${id}`} state={{ group }} className="ms-auto">
          <Button>Test</Button>
        </Link>
      </Card.Header>
      <Accordion.Collapse eventKey={id.toString()}>
        <Card.Body>
          <Accordion>
            {questions?.map((question, i) => {
              return (
                <Accordion.Item key={i} eventKey={`${i}`}>
                  <Accordion.Header>
                    <strong>{i + 1}</strong>. {question.question_text}
                  </Accordion.Header>
                  <Accordion.Body>
                    <ChoiceList choices={question.choices} />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default GroupAccordion;

/*
    <>
      <Accordion.Header as="div">
        <h2 className="h5 d-block w-full me-auto">{name}</h2>
        <Button className="ms-auto" onClick={(e) => e.stopPropagation()}>
          Test
        </Button>
      </Accordion.Header>
      <Accordion.Body>
        <Accordion>
          {questions?.map((question, i) => {
            return (
              <Accordion.Item key={i} eventKey={`${i}`}>
                <Accordion.Header>
                  <strong>{i + 1}</strong>. {question.question_text}
                </Accordion.Header>
                <Accordion.Body>
                  <ChoiceList choices={question.choices} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Accordion.Body>
    </>
 */
