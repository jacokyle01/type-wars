import { useState } from 'react';
import { User, View } from './types/types';
import { Play } from './components/Play';
import { Register } from './components/Register';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

const App = () => {
  const [view, setView] = useState<View>('profile');
  const [user, setUser] = useState<User>({ name: 'joe', id: 15 });

  switch (view) {
    case 'register':
      return <Register setUser={setUser} setView={setView}></Register>;
    case 'play':
      return <Play user={user} setView={setView}></Play>;
    case 'leaderboard':
      return <Leaderboard></Leaderboard>; // Assuming there's a Leaderboard component
    case 'profile':
      return <Profile user={user} setView={setView}></Profile>
  }
};

export default App;
