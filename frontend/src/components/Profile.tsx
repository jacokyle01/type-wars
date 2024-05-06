import { useState } from 'react';
import { User, View } from '../types/types';
import { changeEmail } from '../services/changeEmail';
import { deleteAccount } from '../services/deleteAccount';
interface ProfileProps {
  user: User;
  setView: (view: View) => void;
}
export const Profile: React.FC<ProfileProps> = ({ user, setView }) => {
  const [emailInput, setEmailInput] = useState('');
  const [apiResult, setApiResult] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailInput(e.currentTarget.value);
  };

  const handleChangeEmail = () => {
    changeEmail({ id: user.id, email: emailInput })
      .then((data) => {
        console.log(data);
        setApiResult('success!');
      })
      .catch(() => {
        setApiResult('failure');
      });
  };

  const handleDeleteAccount = () => {
    deleteAccount({ id: user.id }).then((data) => {
      console.log(data);
      setView('register');
    });
  };

  return (
    <div id="main-wrap" className="text-center whitespace-nowrap">
      <div className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 my-10">
        Profile
        <div className="text-gray-500 text-lg font-normal py-2">Update your profile</div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome {user.name}!</h1>
      <div className="flex flex-col items-center">
        <div id="email-wrap" className="inline-block rounded-md ring-2 ring-gray-100 p-3 my-5">
          <h2 className="text-xl font-semibold mb-2">Change your email</h2>
          <input
            value={emailInput}
            onChange={handleChange}
            type="text"
            placeholder="Enter new email"
            className="w-1/2 px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleChangeEmail()}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Go!
          </button>
          <h3 className="mt-2">{apiResult}</h3>
        </div>
        <div id="delete-wrap" className="inline-block rounded-md ring-2 ring-gray-100 p-3 px-20 my-5">
          <h2 className="text-xl font-semibold mb-2">Delete your account</h2>
          <button
            onClick={() => handleDeleteAccount()}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Close account
          </button>
        </div>
      </div>
    </div>
  );
};
