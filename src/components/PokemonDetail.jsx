import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from '../hooks/useFavorites';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Failed to load Pokémon details:', error);
      }
    };

    const fetchEvolutionChain = async () => {
      try {
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const evoChainUrl = speciesRes.data.evolution_chain.url;
        const evoRes = await axios.get(evoChainUrl);
        const chain = evoRes.data.chain;

        const names = [];
        const traverse = (node) => {
          if (!node) return;
          names.push(node.species.name);
          node.evolves_to.forEach(traverse);
        };
        traverse(chain);

        const details = await Promise.all(
          names.map(async (name) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return {
              name: res.data.name,
              id: res.data.id,
              sprite: res.data.sprites.front_default,
            };
          })
        );

        setEvolutionData(details);
      } catch (err) {
        console.error('Failed to load evolution data:', err);
      }
    };

    fetchPokemonDetail();
    fetchEvolutionChain();
  }, [id]);

  if (!pokemon) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{pokemon.name}</h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-64 h-64 object-contain mb-6 rounded-lg shadow-lg"
        />
        <div className="my-4">
          <button
            onClick={() => isFavorite ? removeFavorite(pokemon.id) : addFavorite(pokemon)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Stats</h3>
        <ul className="space-y-2">
          <li className="text-lg">HP: {pokemon.stats[0].base_stat}</li>
          <li className="text-lg">Attack: {pokemon.stats[1].base_stat}</li>
          <li className="text-lg">Defense: {pokemon.stats[2].base_stat}</li>
          <li className="text-lg">Speed: {pokemon.stats[5].base_stat}</li>
        </ul>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Abilities</h3>
        <ul className="space-y-2">
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className="text-lg">{ability.ability.name}</li>
          ))}
        </ul>
      </div>

      {evolutionData.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Evolution Chain</h3>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            {evolutionData.map((poke) => (
              <div key={poke.id} className="flex flex-col items-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                  alt={poke.name}
                  className="w-20 h-20"
                />
                <p className="capitalize text-sm mt-2">{poke.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
