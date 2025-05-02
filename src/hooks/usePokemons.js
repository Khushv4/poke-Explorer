// hooks/usePokemons.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        setError('Failed to load types');
      }
    };

    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        const detailedPromises = results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => ({
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types.map((t) => t.type.name),
            stats: res.data.stats,
            abilities: res.data.abilities,
            moves: res.data.moves,
          }))
        );

        const detailedPokemons = await Promise.all(detailedPromises);
        setPokemons(detailedPokemons);
        setLoading(false);
      } catch (error) {
        setError('Failed to load Pokémon');
        setLoading(false);
      }
    };

    fetchTypes();
    fetchPokemons();
  }, []);

  return {
    pokemons,
    types,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    loading,
    error
  };
};
