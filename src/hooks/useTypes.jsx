import React, { useContext } from 'react';
import { PokemonCard } from './PokemonCard';
import Pagination from './Pagination';
import { PokemonContext } from '../contexts/PokemonContext';
import useTypes from '../hooks/useTypes';

const PokemonList = () => {
  const {
    pokemons,
    searchTerm,
    selectedType,
    setSelectedType,
    favorites,
    addFavorite,
    removeFavorite,
    currentPage,
    itemsPerPage,
    handlePageChange,
  } = useContext(PokemonContext);

  const { types, loading: typesLoading } = useTypes();

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? pokemon.types.includes(selectedType) : true)
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="px-6 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Pokédex Explorer</h2>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        {!typesLoading && (
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      {filteredPokemons.length === 0 ? (
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
