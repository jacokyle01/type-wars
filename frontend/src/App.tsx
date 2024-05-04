import { useState } from 'react';
import { User, View } from './types/types';
import { Play } from './components/Play';
import { Register } from './components/Register';

const App = () => {
  const [view, setView] = useState<View>('play');
  const [user, setUser] = useState<User>({ name: 'joe', id: 5});

  return view == 'register' ? (
    <Register setUser={setUser} setView={setView}></Register>
  ) : (
    <Play user={user}></Play>
  );
};

export default App;
