import { useLocation } from "react-router-dom";
import { Group } from "../types/apiTypes";
import { Container, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { GroupTestState, type TestQuestion } from "../types/uiTypes";
import { initTestQuestions } from "../lib/utils";
import CollectionTestQuestion from "../components/CollectionTestQuestion";
import CollectionTestResults from "../components/CollectionTestResults";

function GroupTest() {
  const location = useLocation();
  const group: Group = location.state.group;
  const [testState, setTestState] = useState<GroupTestState>({
    testQuestions: initTestQuestions([group]),
    currQuestionIndex: 0,
  });
  const { testQuestions, currQuestionIndex } = testState;
  const progress = (currQuestionIndex / testQuestions.length) * 100;

  if (!group.questions) {
    return (
      <>
        <h1 className="text-center py-4">{group.name} Test</h1>
        <p>No questions to practice</p>
      </>
    );
  }

  const testCompleted =
    testQuestions.length > 0 && testQuestions.length === currQuestionIndex;

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
      <h1 className="text-center py-4 fw-bold">{group.name} Test</h1>
      {testCompleted && <CollectionTestResults testQuestions={testQuestions} />}
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
/*

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
*/

export default GroupTest;
