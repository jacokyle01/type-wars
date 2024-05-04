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
    deleteAccount({id: user.id})
    .then((data) => {
      console.log(data);
      setView('register');
    })
  };

  return (
    <>
      <h1>Welcome {user.name}!</h1>
      <div id="email-wrap">
        <h2>Change your email</h2>
        <input value={emailInput} onChange={handleChange} type="text" placeholder="Enter new email" />
        <button onClick={() => handleChangeEmail()}>Go!</button>
        <h3>{apiResult}</h3>
      </div>
      <div id="delete-wrap">
        <h2>Delete your account</h2>
        <button onClick={() => handleDeleteAccount()}>Close account</button>
      </div>
    </>
  );
};
