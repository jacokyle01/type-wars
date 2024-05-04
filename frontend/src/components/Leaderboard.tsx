import { ChangeEvent, useEffect, useState } from 'react';
import { getLeaderboard } from '../services/getLeaderboard';
import { Result } from '../types/types';

export const Leaderboard = () => {
  const [wordQuery, setWordQuery] = useState(25);
  const [queryLimit, setQueryLimit] = useState(25);
  const [results, setResults] = useState<Result[] | null>(null);

  useEffect(() => {
    setResults(null);
    getLeaderboard({ words: wordQuery, limit: queryLimit }).then((data) => {
      console.log(data);
      setResults(data);
    });

    return () => {
      // ignore = true;
    };
  }, [wordQuery, queryLimit]);

  const isSelected = (wc: number) => {
    return wc == wordQuery ? 'currentWordLimit' : 'wordLimit';
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryLimit(parseInt(event.target.value));
  };

  //TODO query all?
  return (
    <>
      <div id="timeSelect">
        <div className={isSelected(3)} onClick={() => setWordQuery(3)}>
          3
        </div>
        <div className={isSelected(25)} onClick={() => setWordQuery(25)}>
          25
        </div>
        <div className={isSelected(50)} onClick={() => setWordQuery(50)}>
          50
        </div>
        <div className={isSelected(100)} onClick={() => setWordQuery(100)}>
          100
        </div>
        <div className={isSelected(150)} onClick={() => setWordQuery(150)}>
          150
        </div>
        <div className={isSelected(200)} onClick={() => setWordQuery(200)}>
          200
        </div>
      </div>
      <div>
        <label htmlFor="limit">Limit:</label>
        <input
          type="range"
          id="limit"
          name="limit"
          min="1"
          max="100"
          value={queryLimit}
          onChange={handleLimitChange}
        />
        <span>{queryLimit}</span>
      </div>
      <h1>Leaderboard</h1>
      <div id="leaderboard-wrap">
        {results
          ? results.map((result, index) => (
              <div key={index}>
                <p>Name: {result.uname}</p>
                <p>Wpm: {result.wpm}</p>
              </div>
            ))
          : 'Loading'}
      </div>
    </>
  );
};
