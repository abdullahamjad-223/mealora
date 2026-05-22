
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mealApi } from '../services/mealApi';
import { Meal } from '../types';
import MealCard from '../components/MealCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const letter = searchParams.get('f');
  
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let res;
        if (query) {
          res = await mealApi.searchByName(query);
        } else if (letter) {
          res = await mealApi.searchByLetter(letter);
        } else {
          // Default to trending/latest if no query
          res = await mealApi.searchByName('');
        }
        setMeals(res.meals || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, letter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <p className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
             <Search size={14} /> Search Results
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            {query ? `Showing results for "${query}"` : letter ? `Recipes starting with "${letter}"` : 'All Recipes'}
          </h1>
          <p className="text-gray-400 font-medium">Found {meals.length} exquisite recipes matching your criteria.</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 luxury-shadow rounded-2xl text-sm font-bold hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
           ))}
        </div>
      ) : meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-bold">No results found</h3>
          <p className="text-gray-400 max-w-sm mx-auto">We couldn't find any recipes for your search. Try another keyword or explore our categories.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-[#ff6b35] text-white rounded-full font-bold">Back Home</Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
