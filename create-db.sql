CREATE TABLE Sudoku (
id	Integer PRIMARY KEY AUTOINCREMENT,
len	Integer NOT NULL,
puzzle	varchar2(255) NOT NULL UNIQUE,
difficulty	Integer DEFAULT 1
CONSTRAINT chk_len CHECK (len*len=LENGTH(puzzle))
);

INSERT INTO Sudoku (len, puzzle, difficulty)
VALUES (6,'35.....1..53.41.3.5.3.2413.46....31.',3);
INSERT INTO Sudoku (len, puzzle, difficulty)
VALUES (5,'4321..2.4..532.....2..5.1',3);

SELECT * FROM sudoku;
