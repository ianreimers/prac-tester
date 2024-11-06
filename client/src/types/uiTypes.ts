import { Choice } from "./apiTypes";

export interface TestQuestion {
  groupId: number;
  questionId: number;
  question_text: string;
  choices: Choice[];
  chosenChoiceIds: number[];
}

export interface CollectionTestState {
  testQuestions: TestQuestion[];
  currQuestionIndex: number;
}

export interface GroupTestState {
  testQuestions: TestQuestion[];
  currQuestionIndex: number;
}
