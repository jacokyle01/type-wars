import { useState } from 'react';
import { User, View } from './types/types';
import { Play } from './components/Play';
import { Register } from './components/Register';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { Login } from './components/Login';

const App = () => {
  const [view, setView] = useState<View>('register');
  const [user, setUser] = useState<User>({ name: '', id: 0 });

  switch (view) {
    case 'register':
      return <Register setView={setView}></Register>;
    case 'login':
      return <Login setUser={setUser} setView={setView}></Login>
    case 'play':
      return <Play user={user} setView={setView}></Play>;
    case 'leaderboard':
      return <Leaderboard></Leaderboard>; // Assuming there's a Leaderboard component
    case 'profile':
      return <Profile user={user} setView={setView}></Profile>
  }
};

export default App;
