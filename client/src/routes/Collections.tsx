import { useQuery } from "@tanstack/react-query";
import { getAllCollectionData } from "../api/api";
import Accordion from "react-bootstrap/Accordion";
import { Container } from "react-bootstrap";
import CollectionAccordion from "../components/CollectionAccordion";

function Collections() {
  const { data: collections, error } = useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollectionData,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!collections) {
    return <p>Error returned undefined</p>;
  }

  return (
    <Container>
      <h1 className="text-center mb-5 mt-5">Collections</h1>
      <Accordion>
        {collections.map((collection, i) => {
          const { id } = collection;

          return (
            <Accordion.Item key={id} eventKey={`${i}`}>
              <CollectionAccordion
                collection={collection}
                eventKeyOffset={collections.length + i}
              />
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}

export default Collections;
