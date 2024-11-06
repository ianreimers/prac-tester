import { useState } from "react";
import { TestQuestion } from "../types/uiTypes";
import TestResult from "./TestResult";

interface Props {
  testQuestions: TestQuestion[];
}

function CollectionTestResults({ testQuestions }: Props) {
  const [testResults, setTestResults] = useState<TestQuestion[]>([]);

  return (
    <>
      <h1>Test Results</h1>
      <div className="d-flex felx-wrap gap-4">
        {testQuestions.map((testQuestion) => {
          return <TestResult testQuestion={testQuestion} />;
        })}
      </div>
    </>
  );
}

export default CollectionTestResults;
