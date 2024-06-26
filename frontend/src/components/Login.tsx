import { useState } from 'react';
import { User, View } from '../types/types';
import { getUser } from '../services/getUser';

interface FormProps {
  setUser: (user: User) => void;
  setView: (view: View) => void;
}

export const Login: React.FC<FormProps> = ({ setUser, setView }) => {
  const [userInput, setUserInput] = useState('');
  const [apiResult, setApiResult] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUser({ username: userInput })
      .then((data) => {
        setApiResult('Success!');
        console.log(data);
        const { id, username } = data;
        setUser({
          id,
          name: username,
        });
        setView('play');
      })
      .catch((error) => {
        console.log('error: ', error);
        setApiResult('Error logging in. Try again.');
      });
  };

  return (
    <>
      <div className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Login
          <div className="text-gray-500 text-lg font-normal py-2">Start playing</div>
        </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-5">
        <input
          value={userInput}
          onChange={handleChange}
          type="text"
          placeholder="Enter username"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Login
        </button>
      </form>
      <h2 className='text-red-500 font-bold mx-auto text-center'>{apiResult}</h2>
    </>
  );
};
