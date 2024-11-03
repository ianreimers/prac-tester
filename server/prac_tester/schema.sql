DROP TABLE IF EXISTS question_group;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS choice;

CREATE TABLE question_group (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_text TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  question_group_id INTEGER NOT NULL,
  FOREIGN KEY (question_group_id) REFERENCES question_group (id)
);

CREATE TABLE choice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice_text TEXT NOT NULL,
  explanation TEXT,
  is_correct BOOLEAN NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  question_id INTEGER,
  FOREIGN KEY (question_id) REFERENCES question (id)
);
