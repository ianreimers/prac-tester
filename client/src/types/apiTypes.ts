/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface Choice {
  id: number;
  choice_text: string;
  is_correct: boolean;
}
export interface Group {
  id: number;
  name: string;
  questions?: Question[];
}
export interface Question {
  id: number;
  question_text: string;
  choices?: Choice[];
}
