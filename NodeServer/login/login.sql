use database login;

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO accounts (username, email, password)
VALUES ('john', 'john@example.com', 'password123');
