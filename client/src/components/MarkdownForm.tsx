import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function MarkdownForm() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("File upload failed");
        }

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control
          type="file"
          name="file"
          accept=".md"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default MarkdownForm;
