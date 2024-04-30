import { useState } from 'react';
import { View } from './types/types';
import { Login } from './components/Login';

const App = () => {
  const [view, setView] = useState<View>('login');

  return view == 'login' ? <Login></Login> : <></>;
};

export default App;
