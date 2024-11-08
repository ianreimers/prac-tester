import { Accordion, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import ChoiceList from "./ChoiceList";
import { Link } from "react-router-dom";

import { type Group } from "../types/apiTypes";

interface Props {
  group: Group;
  eventKeyOffset: number;
}

function GroupAccordion({ group, eventKeyOffset }: Props) {
  const { id, name, questions } = group;

  const decoratedOnClick = useAccordionButton(`${eventKeyOffset}`);

  return (
    <Card className="border-0">
      <Card.Header
        className="d-flex align-items-center"
        onClick={decoratedOnClick}
        style={{ cursor: "pointer" }}
      >
        <h2>{name}</h2>
        <Link to={`group/test/${id}`} state={{ group }} className="ms-auto">
          <Button>Test</Button>
        </Link>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKeyOffset.toString()}>
        <Card.Body>
          <Accordion>
            {questions?.map((question, i) => {
              const { id, question_text, choices } = question;

              return (
                <Accordion.Item key={id} eventKey={`${eventKeyOffset + i}`}>
                  <Accordion.Header>
                    <p className="pb-0 mb-0 me-2">
                      <strong>{i + 1}</strong>.
                    </p>{" "}
                    <p className="pb-0 mb-0">{question_text}</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ChoiceList choices={choices} />
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
