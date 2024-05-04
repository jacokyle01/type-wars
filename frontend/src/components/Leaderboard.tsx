import { useEffect, useState } from 'react';

export const Leaderboard = () => {
  const [wordQuery, setWordQuery] = useState(25);
  const [queryLimit, setQueryLimit] = useState(25);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // let ignore = false;
    setResults(null);
    // fetchBio(person).then((result) => {
    //   if (!ignore) {
    //     setBio(result);
    //   }
    // });
    return () => {
      // ignore = true;
    };
  }, [wordQuery, queryLimit]);

  const isSelected = (wc: number) => {
    return wc == wordQuery ? 'currentWordLimit' : 'wordLimit';
  };

  const handleLimitChange = (event) => {
    setQueryLimit(parseInt(event.target.value));
  };

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
      <div id="leaderboard-wrap">{results ?? 'Loading...'}</div>
    </>
  );
};
