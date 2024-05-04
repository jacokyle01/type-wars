import { useState } from 'react';
import { View } from './types/types';
import { Login } from './components/Login';
import { Play } from './components/Play';

const App = () => {
  //TODO change 
  const [view, setView] = useState<View>('play');
  const [name, setName] = useState('test');

  return view == 'login' ? <Login setName={setName} setView={setView}></Login> : <Play name={name}></Play>;
};

export default App;
