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
      <h1 className="text-center mb-4">Test Results</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {testQuestions.map((testQuestion) => {
          return <TestResult testQuestion={testQuestion} />;
        })}
      </div>
    </>
  );
}

export default CollectionTestResults;
