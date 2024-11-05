import { Accordion, Button, Card } from "react-bootstrap";
import { Collection } from "../types/apiTypes";
import { useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import GroupAccordion from "./GroupAccordion";

interface Props {
  collection: Collection;
  eventKeyOffset: number;
}

function CollectionAccordion({ collection, eventKeyOffset }: Props) {
  const { id, name, groups } = collection;
  const newEventKey = eventKeyOffset;

  const decoratedOnClick = useAccordionButton(`${newEventKey}`);

  if (!groups) {
    return null;
  }

  return (
    <Card className="border-0">
      <Card.Header
        className="d-flex"
        onClick={decoratedOnClick}
        style={{ cursor: "pointer" }}
      >
        <h2>{name}</h2>
        <Link to={`collection/${id}`} state={{}} className="ms-auto">
          <Button>Test</Button>
        </Link>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKeyOffset.toString()}>
        <Card.Body>
          <Accordion>
            {groups.map((group, i) => {
              return (
                <GroupAccordion
                  key={group.id}
                  group={group}
                  eventKeyOffset={eventKeyOffset + i + groups.length}
                />
              );
            })}
          </Accordion>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default CollectionAccordion;
