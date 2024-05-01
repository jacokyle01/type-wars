import { useState } from 'react';
import { Mode } from '../types/types';

interface Name {
  name: string;
  UID: number;
}

interface PlayProps {
  name: Name;
}

let interval: number = -1;

export const Play: React.FC<PlayProps> = ({ name }) => {
  const [mode, setMode] = useState<Mode>('notStarted');
  const [remainingTime, setRemainingTime] = useState(10); //how long time is left. TODO should start at the timeControl

  //this is the list of words we are trying to type
  const [targetString, setTargetString] = useState('');
  const [wpm, setWpm] = useState(0);

  const handleStart = () => {
    setMode('inProgress'); //updates view
    //TODO make util method that does this
    setTargetString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, optio!');

    // setStarted(true);
    // setEnded(false);
    // setInput(quote.quote);
    // inputRef.current.focus();
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

  return (
    <>
      <h1>Hello {name.name}</h1>
      {(() => {
        switch (mode) {
          case 'notStarted':
            return <button onClick={() => handleStart()}>Click to play</button>;
          case 'inProgress': //could be a separate component
            return (
              <>
                <h1>Time remaining: {remainingTime}</h1>
                <h3>{targetString}</h3>
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
