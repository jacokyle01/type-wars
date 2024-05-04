import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Mode } from '../types/types';

interface PlayProps {
  name: string;
}

let interval: number = -1;

export const Play: React.FC<PlayProps> = ({ name }) => {
  const [mode, setMode] = useState<Mode>('notStarted');
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

  const [wpm, setWpm] = useState(0);

  const handleStart = () => {
    setMode('inProgress'); //updates view
    //TODO make util method that does this
    setTargetString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, optio!');
    // setStarted(true);
    // setEnded(false);
    // setInput(quote.quote);
    setTimer();
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
    console.log('hello');
    const { key } = e;
    setLastPressedKey(key);
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
                <div id="test-wrap">
                  <h3>{targetString}</h3>
                  <div tabIndex={-1} onKeyDown={handleKeyDown} ref={inputRef}>
                    Hello
                  </div>
                  <h3>Last pressed key: {lastPressedKey}</h3>
                </div>
              </>
            );

          case 'finished':
            return (
              <>
                <h1>Your wpm: {wpm}</h1>
                <button onClick={() => handleStart()}>Play again?</button>
              </>
            );
        }
      })()}
    </>
  );
};
