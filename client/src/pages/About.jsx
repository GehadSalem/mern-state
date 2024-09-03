import React from 'react';
import { Link } from 'react-router-dom';
import header from '../assets/header.png';

export default function About() {
  return (
    <div className='flex flex-col md:flex-col lg:flex-row items-center p-28 px-3 max-w-6xl mx-auto h-screen'>
      <div className="flex flex-col gap-6 p-7 lg:w-1/2">
        <h1 className='text-emerald-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-emerald-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>
      <div className="flex-1 p-6 lg:w-1/2">
        <img src={header} alt="header" className="w-96 border-x-4 rounded-full border-emerald-700" />
      </div>
    </div>
  );
}
