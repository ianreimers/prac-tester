import { TestQuestion } from "../types/uiTypes";
import { Choice, Group } from "../types/apiTypes";
import _ from "lodash";

export function initTestQuestions(
  groups: Group[],
  randomize = false,
): TestQuestion[] {
  const resultArr: TestQuestion[] = [];

  groups.forEach((group) => {
    const { id: groupId, questions } = group;

    questions?.forEach((question) => {
      const { id: questionId, question_text, choices } = question;
      const testQuestion: TestQuestion = {
        groupId: groupId,
        questionId: 0,
        question_text: "",
        chosenChoiceIds: [],
        choices: [],
      };

      if (!choices) {
        return;
      }

      testQuestion.questionId = questionId;
      testQuestion.question_text = question_text;
      testQuestion.chosenChoiceIds = [];
      testQuestion.choices = choices;
      resultArr.push(testQuestion);
    });
  });

  return randomize ? _.shuffle(resultArr) : resultArr;
}

export function hasMultipleAnswers(choices: Choice[]): boolean {
  let count = 0;

  choices.forEach((choice) => {
    if (choice.is_correct) {
      count += 1;
    }
  });

  return count > 1;
}
