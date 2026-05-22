
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import MealCard from '../components/MealCard';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('mealora_favs') || '[]');
    setFavorites(favs);
  }, []);

  const clearFavorites = () => {
    if (window.confirm('Clear all your favorite recipes?')) {
      localStorage.setItem('mealora_favs', '[]');
      setFavorites([]);
    }
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.idMeal !== id);
    localStorage.setItem('mealora_favs', JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[60vh]">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <p className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Heart size={14} fill="currentColor" /> My Cookbook
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Favorite Recipes</h1>
          <p className="text-gray-400 font-medium">Your personal collection of saved global dishes.</p>
        </div>
        
        {favorites.length > 0 && (
          <button 
            onClick={clearFavorites}
            className="flex items-center gap-2 px-6 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors"
          >
            <Trash2 size={18} /> Clear All
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((meal) => (
            <MealCard 
              key={meal.idMeal} 
              meal={meal} 
              isFavorite={true} 
              onToggleFavorite={() => removeFavorite(meal.idMeal)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Heart size={40} />
          </div>
          <h3 className="text-2xl font-bold">Your cookbook is empty</h3>
          <p className="text-gray-400 max-w-sm mx-auto">Start browsing and tap the heart icon to save recipes you love for later.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-[#ff6b35] text-white rounded-full font-bold">Start Exploring</Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
