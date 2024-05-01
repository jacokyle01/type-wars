import { useState } from 'react';
import { View } from '../types/types';

interface FormProps {
  setName: (name: object) => void
  setView: (view: View) => void
}

export const Register: React.FC<FormProps> = ({setName ,setView}) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeUserName = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleChangeFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  }

  const handleChangeLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  }

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
        "name": "",
        "UID": 0
    }

    const response = await fetch("http://localhost:3001/user", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				username: userName,
				forename: firstName,
				surname: lastName,
				email: email
        }),
    })
    
    const user = await response.json();

    data.name = userName;
    data.UID = user.id;

    setName(data);

    setView('play');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={firstName} onChange={handleChangeFirstName} type="text" placeholder="Enter First Name" />
      <input value={lastName} onChange={handleChangeLastName} type="text" placeholder="Enter Last Name" />
      <input value={email} onChange={handleChangeEmail} type="text" placeholder="Enter Email" />
      <input value={userName} onChange={handleChangeUserName} type="text" placeholder="Enter Username" />
      <button>Sign Up</button>
    </form>
  );
};