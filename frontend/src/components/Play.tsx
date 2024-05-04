import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Mode, TypingResult, User } from '../types/types';
import { allowedKeys } from '../util/constants';
import { wordGen } from '../util/word';
import { postResult } from '../services/postResult';

interface PlayProps {
  user: User;
}
let interval: number = 0;

export const Play: React.FC<PlayProps> = ({ user }) => {
  const [mode, setMode] = useState<Mode>('notStarted');
  const [wordLimit, setWordLimit] = useState(25);
  const [typingResult, setTypingResult] = useState<TypingResult>('null');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [lastWpm, setLastWpm] = useState(0);

  const inputRef = useRef<HTMLDivElement>(null);
  const [spentTime, setSpentTime] = useState(0); //how long time is left. TODO should start at the timeControl
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
    return spentTime ? (wordsTyped * 60) / spentTime : 0;
  };

  const resetGame = () => {
    clearInterval(interval);
    setTypingResult('null');
    setWordsTyped(0);
    setSpentTime(0);
    setCompletionIndex(0);
    setMode('finished');
  }

  const handleEnd = () => {
    setLastWpm(getWpm());
    postResult({ uname: user.name, uid: user.id, wpm: lastWpm, words: wordLimit })
      .then(resetGame)
      .catch(console.error);
  };

  const setTimer = () => {
    const startTime = Date.now();
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const secondsPassed = Math.round(elapsedTime / 1000);
      setSpentTime(secondsPassed);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const { key } = e;
    if (key === targetString.charAt(completionIndex)) {
      if (key == ' ') {
        setWordsTyped(wordsTyped + 1);
      }
      setTypingResult('correct');
      setCompletionIndex(completionIndex + 1);
      setLastPressedKey(key);
      if (completionIndex + 1 === targetString.length) {
        handleEnd();
      }
    } else if (allowedKeys.includes(key)) {
      setTypingResult('incorrect');
    }
  };

  const isSelected = (wc: number) => {
    return wc == wordLimit ? 'currentWordLimit' : 'wordLimit';
  };

  return (
    <>
      <h1>Hello {user.name}</h1>
      {(() => {
        switch (mode) {
          case 'notStarted':
            return (
              <>
                <div id="timeSelect">
                  <div className={isSelected(3)} onClick={() => setWordLimit(3)}>
                    3
                  </div>
                  <div className={isSelected(25)} onClick={() => setWordLimit(25)}>
                    25
                  </div>
                  <div className={isSelected(50)} onClick={() => setWordLimit(50)}>
                    50
                  </div>
                  <div className={isSelected(100)} onClick={() => setWordLimit(100)}>
                    100
                  </div>
                  <div className={isSelected(150)} onClick={() => setWordLimit(150)}>
                    150
                  </div>
                  <div className={isSelected(200)} onClick={() => setWordLimit(200)}>
                    200
                  </div>
                </div>
                <button onClick={() => handleStart()}>Click to play</button>
              </>
            );
          case 'inProgress': //could be a separate component
            return (
              <>
                <h1>Time spent: {spentTime}</h1>
                <h1>Your wpm: {getWpm()}</h1>
                <div id="test-wrap">
                  {/* <h3>{targetString}</h3> */}
                  <div className={typingResult} tabIndex={-1} onKeyDown={handleKeyDown} ref={inputRef}>
                    {targetString.slice(0, completionIndex) + '|'}
                    <span style={{ color: 'gray' }}>{targetString.slice(completionIndex)}</span>
                  </div>
                  <h3>Last pressed key: {lastPressedKey}</h3>
                </div>
              </>
            );

          case 'finished':
            return (
              <>
                <h1>Your wpm: {lastWpm}</h1>
                <button onClick={() => handleStart()}>Play again?</button>
              </>
            );
        }
      })()}
    </>
  );
};
