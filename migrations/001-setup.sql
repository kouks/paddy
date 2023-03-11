
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE birthdays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memberId TEXT NOT NULL,
  day INTEGER NOT NULL,
  month INTEGER NOT NULL
);

CREATE UNIQUE INDEX idx_birthdays_member_id ON birthdays (memberId);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX idx_birthdays_member_id;
DROP TABLE hunters;
