import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Mode, TypingResult } from '../types/types';
import { allowedKeys } from '../util/constants';
import { wordGen } from '../util/word';

interface PlayProps {
  name: string;
}

let interval: number = 0;

export const Play: React.FC<PlayProps> = ({ name }) => {
  const [mode, setMode] = useState<Mode>('notStarted');
  const [wordLimit, setWordLimit] = useState(100);
  const [typingResult, setTypingResult] = useState<TypingResult>('null');
  const [wordsTyped, setWordsTyped] = useState(0);

  const inputRef = useRef<HTMLDivElement>(null);
  const [remainingTime, setRemainingTime] = useState(10); //how long time is left. TODO should start at the timeControl
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  //this is the list of words we are trying to type
  const [targetString, setTargetString] = useState('');
  //indexes up to what position we have succesfully entered values
  const [completionIndex, setCompletionIndex] = useState(0);
  const [lastPressedKey, setLastPressedKey] = useState('');

  const handleStart = () => {
    setMode('inProgress'); //updates view
    //TODO make util method that does this
    // setTargetString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, optio!');
    setTargetString(wordGen(wordLimit));
    // setStarted(true);
    // setEnded(false);
    // setInput(quote.quote);
    setTimer();
  };

  //TODO wpm
  //TODO uses a constant!
  const getWpm = () => {
    return wordsTyped * 60 / (10 - remainingTime);
  };

  const handleEnd = () => {
    clearInterval(interval);
    setMode('finished');
  };

  const setTimer = () => {
    const now = Date.now();
    const seconds = now + remainingTime * 1000;
    interval = setInterval(() => {
      const secondsLeft = Math.round((seconds - Date.now()) / 1000);
      setRemainingTime(secondsLeft);
      if (secondsLeft === 0) {
        handleEnd();
      }
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const { key } = e;
    if (key === targetString.charAt(completionIndex)) {
      if (key == " ") {
        setWordsTyped(wordsTyped + 1);
      }
      setTypingResult('correct');
      setCompletionIndex(completionIndex + 1);
      setLastPressedKey(key);
    } else if (allowedKeys.includes(key)) {
      setTypingResult('incorrect');
    }
  };

  return (
    <>
      <h1>Hello {name}</h1>
      {(() => {
        switch (mode) {
          case 'notStarted':
            return <button onClick={() => handleStart()}>Click to play</button>;
          case 'inProgress': //could be a separate component
            return (
              <>
                <h1>Time remaining: {remainingTime}</h1>
                <h1>Your wpm: {getWpm()}</h1>
                <div id="test-wrap">
                  <h3>{targetString}</h3>
                  <div className={typingResult} tabIndex={-1} onKeyDown={handleKeyDown} ref={inputRef}>
                    {targetString.slice(0, completionIndex) + '|'}
                  </div>
                  <h3>Last pressed key: {lastPressedKey}</h3>
                </div>
              </>
            );

          case 'finished':
            return (
              <>
                <h1>Your wpm: {getWpm()}</h1>
                <button onClick={() => handleStart()}>Play again?</button>
              </>
            );
        }
      })()}
    </>
  );
};
