import React, { useState } from 'react';
import axios from 'axios';

const Comparison = () => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [error, setError] = useState(null);

  const handleComparison = async () => {
    try {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${firstInput.toLowerCase()}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${secondInput.toLowerCase()}`)
      ]);

      setFirstPokemon(firstResponse.data);
      setSecondPokemon(secondResponse.data);
      setError(null);
    } catch (err) {
      setError('One or both Pokémon names are incorrect. Please try again.');
      setFirstPokemon(null);
      setSecondPokemon(null);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
          placeholder="Enter first Pokémon"
          className="border rounded-lg px-4 py-2 w-48"
        />
        <input
          type="text"
          value={secondInput}
          onChange={(e) => setSecondInput(e.target.value)}
          placeholder="Enter second Pokémon"
          className="border rounded-lg px-4 py-2 w-48"
        />
        <button
          onClick={handleComparison}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Compare
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {firstPokemon && secondPokemon && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[firstPokemon, secondPokemon].map((poke, i) => (
            <div key={i} className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold capitalize mb-1">
                #{poke.id} {poke.name}
              </h2>
              <div className="flex justify-center gap-4 mb-4">
                <img
                  src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default}
                  alt={poke.name}
                  className="w-32 h-32 object-contain"
                />
                <img
                  src={poke.sprites.back_default}
                  alt={`${poke.name} back`}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <ul className="text-left text-sm space-y-1">
                {poke.stats.map((stat, index) => (
                  <li key={index}>
                    <span className="font-semibold capitalize">{stat.stat.name.replace('-', ' ')}:</span>{' '}
                    {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comparison;
