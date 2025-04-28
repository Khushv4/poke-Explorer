import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, selectedType, setSelectedType, types }) => {
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
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
