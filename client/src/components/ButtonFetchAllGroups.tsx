import Button from "react-bootstrap/Button";

function ButtonFetchAllGroups() {
  function handleClick(_: React.MouseEvent<HTMLButtonElement>) {
    const url = "http://localhost:5000/api/group";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't fetch all group data");
        }

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  return <Button onClick={handleClick}>FetchAllGroups</Button>;
}

export default ButtonFetchAllGroups;
