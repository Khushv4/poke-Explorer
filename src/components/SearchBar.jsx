import React, { useContext, useState } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, selectedType, setSelectedType, sortOption, setSortOption, types } = useContext(PokemonContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center my-6">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-md p-2 w-60"
      />

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border rounded-md p-2 w-60"
      >
        <option value="">All Types</option>
        {types?.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border rounded-md p-2 w-60"
      >
        <option value="id-asc">ID (Asc)</option>
        <option value="id-desc">ID (Desc)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  );
};

export default SearchBar;
