import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MealDetail from './pages/MealDetail';
import SearchResults from './pages/SearchResults';
import FilteredResults from './pages/FilteredResults';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/category/:id" element={<FilteredResults />} />
          <Route path="/area/:id" element={<FilteredResults />} />
          <Route path="/ingredient/:id" element={<FilteredResults />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
