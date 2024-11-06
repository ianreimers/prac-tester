import { useLocation } from "react-router-dom";
import { Collection } from "../types/apiTypes";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { initTestQuestions } from "../lib/utils";
import { CollectionTestState, TestQuestion } from "../types/uiTypes";
import CollectionTestQuestion from "../components/CollectionTestQuestion";
import CollectionTestResults from "../components/CollectionTestResults";
import ProgressBar from "react-bootstrap/ProgressBar";

const initialState: CollectionTestState = {
  testQuestions: [],
  currQuestionIndex: 0,
};

function CollectionTest() {
  const location = useLocation();
  const collection: Collection = location.state.collection;
  const { name, groups } = collection;
  const [testState, setTestState] = useState<CollectionTestState>(initialState);
  const { testQuestions, currQuestionIndex } = testState;
  const testCompleted =
    testQuestions.length > 0 && testQuestions.length === currQuestionIndex;
  const progress = (currQuestionIndex / testQuestions.length) * 100;

  // ask to take sequentially (per group) or randomly (combine groups into singleblock)
  function handleSequentialClick() {
    if (!groups) {
      return;
    }
    setTestState({
      testQuestions: initTestQuestions(groups),
      currQuestionIndex: 0,
    });
  }

  function handleRandomClick() {
    if (!groups) {
      return;
    }

    setTestState({
      testQuestions: initTestQuestions(groups, true),
      currQuestionIndex: 0,
    });
  }

  function handleNextQuestion(chosenChoices: number[]) {
    const currQuestion = testQuestions[currQuestionIndex];

    const updatedTestQuestions: TestQuestion[] = testQuestions.map((q) => {
      if (q.questionId === currQuestion.questionId) {
        const updatedQuestion: TestQuestion = {
          ...currQuestion,
          chosenChoiceIds: chosenChoices,
        };
        return updatedQuestion;
      }

      return q;
    });

    setTestState({
      testQuestions: updatedTestQuestions,
      currQuestionIndex: currQuestionIndex + 1,
    });
  }

  return (
    <Container>
      <h1 className="text-center py-5">{name} Test</h1>
      {testCompleted && <CollectionTestResults testQuestions={testQuestions} />}
      {!testCompleted && !testQuestions.length && (
        <div className="d-flex justify-content-center gap-3">
          <Button onClick={handleSequentialClick}>Sequential Questions</Button>
          <Button onClick={handleRandomClick}>Random Questions</Button>
        </div>
      )}
      {!testCompleted && testQuestions.length > 0 && (
        <>
          <ProgressBar
            now={progress}
            label={`${currQuestionIndex}/${testQuestions.length}`}
            className="mb-4"
          />
          <CollectionTestQuestion
            testQuestion={testQuestions[currQuestionIndex]}
            onSubmit={handleNextQuestion}
          />
        </>
      )}
    </Container>
  );
}

export default CollectionTest;
