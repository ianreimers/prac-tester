import { TestState } from "../routes/Test";
import { Group } from "../types/apiTypes";

interface Props {
  group: Group;
  results: TestState;
}

function getCorrectTotal(results: TestState, group: Group): number {
  if (!group.questions) {
    throw new Error("No questions to analyze");
  }

  let correctTotal = 0;
  const answerIds = results.answerIds;

  for (let i = 0; i < answerIds.length; ++i) {
    const currQuestion = group.questions[i];

    if (!currQuestion.choices) {
      throw new Error(
        `No choices to analyze for question id: ${currQuestion.id}`,
      );
    }

    for (let j = 0; j < currQuestion.choices.length; ++j) {
      const currChoice = currQuestion.choices[j];

      if (answerIds[i] === currChoice.id && currChoice.is_correct) {
        correctTotal += 1;
      }
    }
  }

  return correctTotal;
}

function TestResults({ results, group }: Props) {
  const totalQuestions = group.questions?.length;
  const correctTotal = getCorrectTotal(results, group);

  return (
    <h2>
      Answers Correct: {correctTotal}/{totalQuestions}
    </h2>
  );
}

export default TestResults;
