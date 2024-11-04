import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import InputForm from "./components/InputForm";
import MarkdownForm from "./components/MarkdownForm";
import ButtonFetchAll from "./components/ButtonFetchAll";
import ButtonFetchAllGroups from "./components/ButtonFetchAllGroups";

function App() {
  return (
    <body>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Prac-Tester</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
    </body>
  );
}

export default App;
