import { useState } from 'react';
import { View } from '../types/types';
import { createAccount } from '../services/createAccount';

interface FormProps {
  setView: (view: View) => void;
}

export const Register: React.FC<FormProps> = ({ setView }) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [apiResult, setApiResult] = useState('');

  const handleChangeUserName = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleChangeFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };

  const handleChangeLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
      createAccount({
        username: userName,
        forename: firstName,
        surname: lastName,
        email: email,
      })
        .then(() => {
        setView('login');
      })
      .catch(() => {
        setApiResult('User already exists');
      });
  
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto m-20">
      <input
        value={firstName}
        onChange={handleChangeFirstName}
        type="text"
        placeholder="Enter First Name"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        value={lastName}
        onChange={handleChangeLastName}
        type="text"
        placeholder="Enter Last Name"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        value={email}
        onChange={handleChangeEmail}
        type="text"
        placeholder="Enter Email"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        value={userName}
        onChange={handleChangeUserName}
        type="text"
        placeholder="Enter Username"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Sign Up
      </button>
      <h3 className="mt-2">{apiResult}</h3>
    </form>
  );
};