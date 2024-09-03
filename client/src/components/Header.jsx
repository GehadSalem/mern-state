import { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm(""); // Clear search input if not on search page
    }
  }, [location.pathname]);


  return (
    <header className="bg-emerald-100 shadow-md relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link className="hover:scale-105 transition-scale duration-300 cursor-pointer" to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-emerald-500">Real</span>
            <span className="text-emerald-700">Estate</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-emerald-50 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="">
            <FaSearch className="text-emerald-600 hover:scale-105 transition-scale duration-300 cursor-pointer" />
          </button>
        </form>

        {/* Dropdown Menu Icon */}
        <button
          className="block sm:hidden p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaBars className="text-emerald-700 hover:scale-105 transition-scale duration-300" />
        </button>

        {/* Navigation Links */}
        <ul className={`hidden sm:flex gap-4 items-center ${dropdownOpen ? "block" : "hidden"}`}>
          <Link to="/">
            <li className="text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">
              About
            </li>
          </Link>
          <Link to="/listings">
            <li className="text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">
              Listings
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-10 w-10 object-cover hover:scale-105 transition-scale duration-300"
                src={currentUser?.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {dropdownOpen && (
        <div className="absolute top-15 right-0 bg-emerald-50 shadow-lg rounded-lg p-4 mr-4 z-50 w-30">
          <Link to="/" onClick={() => setDropdownOpen(false)}>
            <p className="text-emerald-700 hover:underline cursor-pointer p-1 hover:text-emerald-400">Home</p>
          </Link>
          <Link to="/about" onClick={() => setDropdownOpen(false)}>
            <p className="text-emerald-700 p-1 hover:underline cursor-pointer hover:text-emerald-400">About</p>
          </Link>
          <Link to="/listings" onClick={() => setDropdownOpen(false)}>
            <p className="text-emerald-700 p-1 hover:underline cursor-pointer hover:text-emerald-400">Listings</p>
          </Link>
          {!currentUser ? (
            <Link to="/sign-in" onClick={() => setDropdownOpen(false)}>
              <p className="text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">Sign In</p>
            </Link>
          ) : (
            <Link to="/profile" onClick={() => setDropdownOpen(false)}>
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser?.avatar}
                alt="profile"
              />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
