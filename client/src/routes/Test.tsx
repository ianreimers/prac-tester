import { useLocation } from "react-router-dom";
import { Group } from "../types/apiTypes";
import { Container } from "react-bootstrap";
import { useState } from "react";
import TestResults from "../components/TestResults";
import TestQuestion from "../components/TestQuestion";

export interface TestState {
  currQuestionId: number;
  answerIds: number[];
}

function Test() {
  const [state, setState] = useState<TestState>({
    currQuestionId: 0,
    answerIds: new Array(),
  });

  const location = useLocation();
  const group: Group = location.state.group;

  if (!group.questions) {
    return (
      <>
        <h1 className="text-center py-4">{group.name} Test</h1>
        <p>No questions to practice</p>
      </>
    );
  }

  const currQuestion = group.questions[state.currQuestionId];
  const testCompleted = group.questions.length === state.answerIds.length;

  function handleNextQuestion(selectedChoiceId: number) {
    setState({
      ...state,
      currQuestionId: state.currQuestionId + 1,
      answerIds: [...state.answerIds, selectedChoiceId],
    });
  }

  return (
    <>
      <h1 className="text-center py-4">{group.name} Test</h1>
      <Container>
        {testCompleted ? (
          <TestResults results={state} group={group} />
        ) : (
          <TestQuestion
            question={currQuestion}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </Container>
    </>
  );
}

export default Test;
