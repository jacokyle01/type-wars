import { View } from "../types/types";

interface NavbarProps {
  view: View;
  setView: (view: View) => void;
}


export const Navbar: React.FC<NavbarProps> = ({view, setView}) => {
  if (view == 'play' || view == 'leaderboard' || view == 'profile') {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Type Wars</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <div
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            onClick={() => setView('play')}
          >
            Play
          </div>
          <div
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            onClick={() => setView('leaderboard')}
          >
            Leaderboard
          </div>
          <div
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            onClick={() => setView('profile')}
          >
            Profile
          </div>
        </div>
        <div>
          <div
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
            border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={() => setView('login')}
          >
            Log out
          </div>
        </div>
      </div>
    </nav>
  );
  }
  else {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Type Wars</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div>
          <div
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
            border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={() => setView('register')}
          >
            Register
          </div>
        </div>
        <div>
          <div
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
            border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={() => setView('login')}
          >
            Log In
          </div>
        </div>
      </div>
    </nav>
    )
  }
};
