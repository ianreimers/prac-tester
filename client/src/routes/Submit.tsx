import Container from "react-bootstrap/Container";
import MarkdownForm from "../components/MarkdownForm";
import ButtonFetchAll from "../components/ButtonFetchAll";
import ButtonFetchAllGroups from "../components/ButtonFetchAllGroups";
import InputForm from "../components/InputForm";

function Submit() {
  return (
    <>
      <Container>
        <InputForm />
        <div className="bg-dark p-5 mt-5">
          <MarkdownForm />
        </div>
        <div className="d-flex justify-content-center p-3">
          <ButtonFetchAll />
          <ButtonFetchAllGroups />
        </div>
      </Container>
    </>
  );
}

export default Submit;
