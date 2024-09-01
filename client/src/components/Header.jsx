import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
// const [first, setfirst] = useState(second)
  const {currentUser} = useSelector(state=> state.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/' >
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4 items-center">
            <Link to='/'>
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer hover:text-slate-400">
            Home
          </li>
            </Link>
          <Link to='/about'>
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer hover:text-slate-400">
            About
          </li>
          </Link>
           
           {currentUser ? (
            <Link to='/profile'>
              <img className="rounded-full h-10 w-10 object-cover" src={currentUser?.avatar} alt="profile" />
            </Link>
            
          ) : (
          <Link to='/sign-in'>
          <li className="text-slate-700 hover:underline cursor-pointer hover:text-slate-400">
            Sign In
          </li>
          </Link>
        )}
         
          
          
          
        </ul>
      </div>
    </header>
  );
}
