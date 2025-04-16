import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="logo">
        <h1 className="text-3xl font-semibold">CA Test</h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-teal-400 transition-colors">Home</a></li>
          <li><a href="#about" className="hover:text-teal-400 transition-colors">About</a></li>
          <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
          <li><a href="#guest" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">Guest</a></li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? 'X' : '☰'}
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <ul className="flex flex-col space-y-4">
              <li><a href="/" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
              <li><a href="#guest" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">Guest</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
