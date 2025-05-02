import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-center">
      <header className="bg-blue-500 w-full max-w-5xl p-4 text-white rounded-xl mt-5">
        <nav className="flex justify-between">
          <Link to="/" className="text-lg font-bold">Pokémon Explorer</Link>
          <Link to="/favorites" className="text-lg">Favorites</Link>
          <Link to="/compare"
          className="text-lg">Compare</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;

