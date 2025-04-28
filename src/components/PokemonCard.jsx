import React, { useEffect, useRef } from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div  className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition hover:scale-105">
      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
      <h3 className="text-lg font-bold mt-2 capitalize">{pokemon.name}</h3>
      <p className="text-gray-500">ID: {pokemon.id}</p>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span key={type} className="bg-indigo-200 text-indigo-700 px-2 py-1 rounded-full text-xs capitalize">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;

