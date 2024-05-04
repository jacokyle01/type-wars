import { useState } from 'react';
import { User, View } from './types/types';
import { Play } from './components/Play';
import { Register } from './components/Register';
import { Leaderboard } from './components/Leaderboard';

const App = () => {
  const [view, setView] = useState<View>('leaderboard');
  const [user, setUser] = useState<User>({ name: 'joe', id: 5 });

  switch (view) {
    case 'register':
      return <Register setUser={setUser} setView={setView}></Register>;
    case 'play':
      return <Play user={user} setView={setView}></Play>;
    case 'leaderboard':
      return <Leaderboard></Leaderboard>; // Assuming there's a Leaderboard component
    default:
      return null; // Or some default component if view doesn't match any case
  }
};

export default App;
