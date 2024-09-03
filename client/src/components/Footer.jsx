import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center">
      <div className="border-t w-full flex flex-col lg:flex-row bg-white items-center justify-between">
        <div className="flex flex-col flex-1 p-10 items-center">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap pb-4">
              <span className="text-emerald-500">Real</span>
              <span className="text-emerald-700">Estate</span>
            </h1>
          </Link>
          <div className="flex gap-3">
            <FaFacebookSquare className="text-3xl text-emerald-900 hover:scale-105 transition-scale duration-300 cursor-pointer" />
            <FaInstagramSquare className="text-3xl text-emerald-900 hover:scale-105 transition-scale duration-300 cursor-pointer" />
            <FaSquareXTwitter className="text-3xl text-emerald-900 hover:scale-105 transition-scale duration-300 cursor-pointer" />
            <FaLinkedin className="text-3xl text-emerald-900 hover:scale-105 transition-scale duration-300 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col flex-1 p-10 md:p-5 items-center">
          <p className="truncate text-lg font-semibold text-slate-700 pb-4">Subscribe for more news</p>
          <div className="flex items-center">
            <input
              className="bg-emerald-50 focus:outline-none w-18 p-3 rounded-lg mr-2 sm:w-54"
              placeholder="Enter your email"
              htmlFor="outlined-adornment-email-register"
            />
            <button className="p-3 w-20 text-emerald-50 rounded-lg bg-emerald-900 hover:scale-105 transition-scale duration-300 cursor-pointer">Send</button>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-10">
          <p>Pages :</p>
          <ul className="flex gap-4">
            <div className="flex flex-col">
              <Link to="/">
                <li className=" sm:inline text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">Home</li>
              </Link>
              <Link to="/about">
                <li className=" sm:inline text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">About</li>
              </Link>
              <Link to="/listings">
                <li className=" sm:inline text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">Listings</li>
              </Link>
            </div>
            {currentUser ? (
              <Link className="flex items-center justify-center gap-4 bg-emerald-50 rounded-full px-7" to="/profile">
                <img
                  className="rounded-full h-10 w-10 object-cover hover:scale-105 transition-scale duration-300"
                  src={currentUser?.avatar}
                  alt="profile"
                />
                <p className=" sm:inline text-emerald-700 hover:underline cursor-pointer hover:text-emerald-400">
                  {currentUser.userName}
                </p>
              </Link>
            ) : (
              <Link  className="flex items-center justify-center gap-4" to="/sign-in">
                <li className="bg-emerald-50 p-3 rounded-lg text-emerald-900 hover:underline cursor-pointer hover:text-emerald-400">Sign In</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <hr />
      <div className="bg-emerald-900 w-full text-center p-5">
        <h6 className="text-emerald-50">Copyright © 2024 GS | All Rights Reserved</h6>
      </div>
    </div>
  );
}
