import { useState } from 'react';
import { View } from '../types/types';

interface FormProps {
  setName: (name: string) => void
  setView: (view: View) => void

}

export const Login: React.FC<FormProps> = ({setName ,setView}) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(userInput);
    setView('play');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={userInput} onChange={handleChange} type="text" placeholder="Enter username"/>
      <button>Enter</button>
    </form>
  );
};