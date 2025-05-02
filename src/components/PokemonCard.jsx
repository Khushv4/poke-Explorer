import React from 'react';
import { Link } from 'react-router-dom';

export const PokemonCard = ({ pokemon, addFavorite, removeFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 duration-300">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 object-contain mb-3"
      />
      <h3 className="text-lg font-bold capitalize text-gray-800">{pokemon.name}</h3>

      <div className="flex flex-wrap justify-center gap-2 my-2">
        {pokemon.types?.map((type) => (
          <span
            key={type}
            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex justify-between w-full mt-4">
        <Link
          to={`/pokemon/${pokemon.id}`}
          className="text-sm text-blue-600 hover:underline transition"
        >
          Details
        </Link>

        <button
          onClick={() => isFavorite ? removeFavorite(pokemon.id) : addFavorite(pokemon)}
          className={`text-sm font-medium px-2 py-1 rounded ${
            isFavorite
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          } transition`}
        >
          {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      </div>
    </div>
  );
};
