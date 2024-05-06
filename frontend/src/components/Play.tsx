import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Mode, TypingResult, User, View } from '../types/types';
import { allowedKeys } from '../util/constants';
import { wordGen } from '../util/word';
import { postResult } from '../services/postResult';

interface PlayProps {
  user: User;
  setView: (view: View) => void;
}
let interval: number = 0;

export const Play: React.FC<PlayProps> = ({ user }) => {
  const [mode, setMode] = useState<Mode>('notStarted');
  const [wordLimit, setWordLimit] = useState(25);
  const [typingResult, setTypingResult] = useState<TypingResult>('null');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [lastWpm, setLastWpm] = useState(0);
  const [targetString, setTargetString] = useState('');
  useEffect(() => {
    setTargetString(wordGen(wordLimit));
  }, [wordLimit]);

  const inputRef = useRef<HTMLDivElement>(null);
  const [spentTime, setSpentTime] = useState(0); //how long time is left. TODO should start at the timeControl
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  //this is the list of words we are trying to type
  //indexes up to what position we have succesfully entered values
  const [completionIndex, setCompletionIndex] = useState(0);
  // const [lastPressedKey, setLastPressedKey] = useState('');

  const handleStart = () => {
    setMode('inProgress'); //updates view
    //TODO make util method that does this
    // setTargetString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, optio!');
    // setStarted(true);
    // setEnded(false);
    // setInput(quote.quote);
    setTimer();
  };

  //TODO wpm
  //TODO uses a constant!
  const getWpm = () => {
    return Math.floor(spentTime ? (wordsTyped * 60) / spentTime : 0);
  };

  const resetGame = () => {
    clearInterval(interval);
    setTypingResult('null');
    setWordsTyped(0);
    setSpentTime(0);
    setCompletionIndex(0);
    setMode('notStarted');
  };

  const handleEnd = () => {
    postResult({ uname: user.name, uid: user.id, wpm: getWpm(), words: wordLimit })
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
    if (mode != 'inProgress') {
      handleStart();
    }
    // setMode('inProgress');
    e.preventDefault();
    const { key } = e;
    if (key === targetString.charAt(completionIndex)) {
      if (key == ' ') {
        setWordsTyped(wordsTyped + 1);
      }
      setTypingResult('correct');
      setCompletionIndex(completionIndex + 1);
      // setLastPressedKey(key);
      if (completionIndex + 1 === targetString.length) {
        handleEnd();
      }
    } else if (allowedKeys.includes(key)) {
      setTypingResult('incorrect');
    }
  };

  const renderWordCountSelect = () => {
    return (
      <div id='main-wrap' className='text-center'>
        <div className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Play
          <div className="text-gray-500 text-lg font-normal py-2">Complete a typing test</div>
        </div>
        <div id="word-count-wrap" className="inline-block rounded-md ring-2 ring-gray-100 mx-auto my-5 px-3 py-2">
          <div className="text-center text-2xl font-bold text-gray-900">
            Choose your word count
          </div>
          <div id="select-wrap" className="flex flex-wrap justify-center">
            {[25, 50, 100, 150, 200].map((option, index) => (
              <button
                key={index}
                className={`m-2 p-3 rounded ${
                  wordLimit === option ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setWordLimit(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTest = () => {
    return (
      <div
        id="test-wrap"
        className="h-1/5 w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      >
        {targetString.slice(0, completionIndex)}
        <span className={typingResult}>|</span>
        <span style={{ color: 'gray' }}>{targetString.slice(completionIndex)}</span>
      </div>
    );
  };

  return (
    <>
      {renderWordCountSelect()}
      {mode == 'notStarted' ? (
        <button
          onClick={() => handleStart()}
          className="mx-auto my-3 w-32 flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Start playing
        </button>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="mx-3 my-3 w-32 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
              Time spent: {spentTime}
            </div>
            <div className="mx-3 my-3 w-32 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
              WPM: {getWpm()}
            </div>
          </div>
        </>
      )}
      {/* <button
        onClick={() => handleStart()}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Start playing
      </button> */}
      {renderTest()}
    </>

    // <>
    //   <h1>Hello {user.name}</h1>
    //   {(() => {
    //     switch (mode) {
    //       case 'notStarted':
    //         return (
    //           <>
    //             {renderWordCountSelect()}
    //             <button
    //               onClick={() => handleStart()}
    //               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             >
    //               Start playing
    //             </button>
    //             {renderTest()}
    //             <button onClick={() => setView('leaderboard')}>See leaderboard</button>
    //           </>
    //         );
    //       case 'inProgress': //could be a separate component
    //         return (
    //           <>
    //             <h1>Time spent: {spentTime}</h1>
    //             <h1>Your wpm: {getWpm()}</h1>
    //             {renderTest()}
    //             <h3>Last pressed key: {lastPressedKey}</h3>
    //           </>
    //         );

    //       case 'finished':
    //         return (
    //           <>
    //             <h1>Your wpm: {lastWpm}</h1>
    //             <button onClick={() => handleStart()}>Play again?</button>
    //           </>
    //         );
    //     }
    //   })()}
    // </>
  );
};
