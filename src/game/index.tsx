import React, { useState, useEffect } from "react";
import { WORD_LIST_DATA } from "../data";

const WORD_LIST = WORD_LIST_DATA.map((word) => word.toUpperCase());
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const isValidWord = (word: string) => WORD_LIST.includes(word.toUpperCase());

const Game: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>(
    Array(MAX_ATTEMPTS).fill("")
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [correctWord, setCorrectWord] = useState(
    () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
  );
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setCorrectWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value.toUpperCase().slice(0, WORD_LENGTH));
  };

  const handleSubmit = () => {
    const normalizedGuess = currentGuess.toUpperCase();
    if (
      normalizedGuess.length === WORD_LENGTH &&
      isValidWord(normalizedGuess)
    ) {
      const newGuesses = [...guesses];
      newGuesses[attempts] = normalizedGuess;
      setGuesses(newGuesses);
      setCurrentGuess("");
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="min-h-screen  bg-black flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Wordle Clone</h1>
        <div className="grid grid-rows-5 gap-1 mb-4 w-full">
          {guesses.map((guess, rowIndex) => (
            <div key={rowIndex} className="flex w-full gap-x-1">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-full h-14 flex items-center justify-center text-white font-bold text-lg border border-gray-700 rounded ${
                    guess[colIndex] === correctWord[colIndex]
                      ? "bg-green-500"
                      : guess.includes(correctWord[colIndex])
                        ? "bg-yellow-500"
                        : "bg-gray-700"
                  }`}
                >
                  {guess[colIndex] || ""}
                </div>
              ))}
            </div>
          ))}
        </div>
        {attempts < MAX_ATTEMPTS ? (
          <div>
            <input
              type="text"
              value={currentGuess}
              onChange={handleInputChange}
              maxLength={WORD_LENGTH}
              className="border text-black border-gray-300 p-2 mb-4 text-lg rounded w-full"
              placeholder="Enter your guess"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          </div>
        ) : (
          <p className="text-red-500 mt-4">
            Game Over! The correct word was: {correctWord}
          </p>
        )}
      </div>
    </div>
  );
};

export default Game;
