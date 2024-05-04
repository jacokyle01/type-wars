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
    // const data = {
    //     "name": "",
    //     "id": 0
    // }
    createAccount({
      username: userName,
      forename: firstName,
      surname: lastName,
      email: email,
    }).then(() => setView('login'));

    // try {
    //   const response = await fetch('http://localhost:3000/api/user', {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({
    //       username: userName,
    //       forename: firstName,
    //       surname: lastName,
    //       email: email,
    //     }),
    //   });

    //   const user = await response.json();

    //   data.name = userName;
    //   data.id = user.id;

    //   setUser(data);

    setView('login');
    // } catch (error) {
    //   console.error('Error:', error);
    // }
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
    </form>
  );
};
