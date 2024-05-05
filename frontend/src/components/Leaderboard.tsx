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

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryLimit(parseInt(event.target.value));
  };

  //TODO query all?
  return (
    <>
      <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Leaderboard
        <div className="text-gray-500 text-lg font-normal">View the top results from each word count</div>
      </div>

      <div id="parameter-wrap" className="flex items-center	justify-center space-x-40 justify-items-center">
        <div id="word-wrap " className="flex flex-col justify-center items-center my-auto">
          <div className="mt-10 text-center text-1xl leading-9 tracking-tight text-gray-900">Words</div>
          <div id="select-wrap" className="flex flex-wrap justify-center">
            {[25, 50, 100, 150, 200].map((option, index) => (
              <button
                key={index}
                className={`m-1 p-1 rounded ${
                  wordQuery === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setWordQuery(option)}
              >
                {option}
              </button>
            ))}
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
            className="block w-30px bg-gray-200 appearance-none rounded h-2"
          />
          <span>{queryLimit}</span>
        </div>
      </div>
      <div id="leaderboard-wrap">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 w-10">Rank</th>
              <th className="border border-gray-300 px-4 py-2 w-10">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-10">WPM</th>
            </tr>
          </thead>
          <tbody>
            {results ? (
              results.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-4 py-2 w-10">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 w-10">{result.uname}</td>
                  <td className="border border-gray-300 px-4 py-2 w-10">{result.wpm}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Loading
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
