import { useState } from 'react';
import { View } from './types/types';
// import { Login } from './components/Login';
import { Play } from './components/Play';
import { Register } from './components/Register';

interface Name {
  name: string;
  UID: number;
}

const App = () => {
  const [view, setView] = useState<View>('register');
  const [name, setName] = useState<Name>({ name: '', UID: 0 });

  return view == 'register' ? <Register setName={setName} setView={setView}></Register> : <Play name={name}></Play>;
};

export default App;
