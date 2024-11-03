import Button from "react-bootstrap/Button";

function ButtonFetchAll() {
  function handleClick(_: React.MouseEvent<HTMLButtonElement>) {
    const url = "http://localhost:5000/api/question/";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching all questions");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  return <Button onClick={handleClick}>Fetch All Questions</Button>;
}

export default ButtonFetchAll;
