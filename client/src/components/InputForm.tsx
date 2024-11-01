import { FormEvent, FormEventHandler, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type FormState = {
  group: string;
  questions: string;
  potentialAnswers: string;
  answer: string;
};

const initalState: FormState = {
  group: "",
  questions: "",
  potentialAnswers: "",
  answer: "",
};

function InputForm() {
  const [formData, setFormData] = useState<FormState>(initalState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //formData[event.target.id] = event.target.value;
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="group">
        <Form.Label>Group</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Group Name"
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          This could be for a Chapter/Section/Custom
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="question">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Question"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="potentialAnswers">
        <Form.Label>Potential Answers</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Potential Answers"
          onChange={handleChange}
          style={{ height: "100px" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="answer">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="Text"
          placeholder="Actual Answers"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default InputForm;
