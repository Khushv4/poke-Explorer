import React, { createContext, useState,  useMemo } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import { useFavorites } from '../hooks/useFavorites';
import { usePagination } from '../hooks/usePagination';

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const {
    pokemons: rawPokemons,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    types,
  } = usePokemons();

  const [sortOption, setSortOption] = useState('id-asc');

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { currentPage, itemsPerPage, setItemsPerPage, handlePageChange } = usePagination(rawPokemons);

  const pokemons = useMemo(() => {
    let filtered = [...rawPokemons];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.includes(selectedType)
      );
    }

    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'id-desc':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'id-asc':
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }, [rawPokemons, searchTerm, selectedType, sortOption]);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        types,
        sortOption,
        setSortOption,
        favorites,
        addFavorite,
        removeFavorite,
        currentPage,
        itemsPerPage,
        setItemsPerPage,
        handlePageChange,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
