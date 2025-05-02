import React, { useContext } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonContext } from '../contexts/PokemonContext';

const Favorites = () => {
  const { favorites, addFavorite, removeFavorite } = useContext(PokemonContext);

  if (favorites.length === 0) {
    return <div className="p-4 text-center text-lg text-gray-500">No favorites yet!</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Your Favorite Pokémon</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
