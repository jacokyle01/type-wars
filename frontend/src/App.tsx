import { useState } from 'react';
import { View } from './types/types';
import { Login } from './components/Login';
import { Play } from './components/Play';

const App = () => {
  const [view, setView] = useState<View>('login');
  const [name, setName] = useState('');

  return view == 'login' ? <Login setName={setName} setView={setView}></Login> : <Play name={name}></Play>;
};

export default App;
