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
      <form onSubmit={handleSubmit}>
        <input value={userInput} onChange={handleChange} type="text" placeholder="Enter username" />
        <button>Enter</button>
      </form>
      <h2>{apiResult}</h2>
    </>
  );
};
