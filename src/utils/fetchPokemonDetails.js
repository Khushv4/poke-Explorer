// src/utils/fetchPokemonDetails.js

import axios from 'axios';

export const fetchPokemonDetails = async (identifier) => {
  try {
    const response = await axios.get(
      typeof identifier === 'string' && identifier.startsWith('http')
        ? identifier
        : `https://pokeapi.co/api/v2/pokemon/${identifier}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Pokémon details:', error);
    return null;
  }
};
