import { useQuery } from "@tanstack/react-query";
import { getAllGroupData } from "../api/api";
import Accordion from "react-bootstrap/Accordion";
import { Container } from "react-bootstrap";
import GroupAccordion from "../components/GroupAccordion";

function Questions() {
  //const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroupData,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <p>Error returned undefined</p>;
  }

  return (
    <Container>
      <h1 className="text-center mb-5 mt-5">Questions should be listed here</h1>
      <Accordion>
        {data.map((group, i) => {
          return (
            <Accordion.Item key={group.id} eventKey={i.toString()}>
              <GroupAccordion group={group} />
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}

export default Questions;
