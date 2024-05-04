import { useState } from 'react';
import { View } from '../types/types';
import axios from "axios";

interface Name {
    name: string;
    UID: number;
  }

import { User, View } from '../types/types';

interface FormProps {
  setUser: (user: User) => void
  setView: (view: View) => void
}

export const Register: React.FC<FormProps> = ({setUser, setView}) => {
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
    const info = {
        "name": "",
        "id": 0
    }

    console.log(userName);
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    try {
    const { data } = await axios("http://localhost:3000/api/user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                data: JSON.stringify({
                    username: userName,
                    forename: firstName,
                    surname: lastName,
                    email: email
            }),
        })
        
        const { user } = data;

        data.name = userName;
        data.id = user.id;

        setUser(info);

        setView('play');
    } catch (error) {
        console.error("Error:", error)
    } 
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