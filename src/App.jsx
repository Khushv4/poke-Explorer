import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Favorites from './components/Favorites';
import Comparison from './components/Comparison';
import PokemonProvider from './contexts/PokemonContext';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <PokemonProvider>
      <Router>
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Comparison />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
