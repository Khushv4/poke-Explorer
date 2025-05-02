import React, { useContext, useEffect, useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonContext } from '../contexts/PokemonContext';
import Pagination from './Pagination';
import Loader from './Loader';

const PokemonList = () => {
  const {
    pokemons,
    searchTerm,
    selectedType,
    favorites,
    addFavorite,
    removeFavorite,
    currentPage,
    itemsPerPage,
    handlePageChange,
  } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [pokemons]);

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? pokemon.types.includes(selectedType) : true)
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="px-6 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Pokédex Explorer
      </h2>

      {loading ? (
        <Loader />
      ) : filteredPokemons.length === 0 ? (
        <p className="text-center text-gray-500">No Pokémon found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {currentPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredPokemons.length}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;

