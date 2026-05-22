
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { mealApi } from '../services/mealApi';
import { FilteredMeal } from '../types';
import MealCard from '../components/MealCard';

const FilteredResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [meals, setMeals] = useState<FilteredMeal[]>([]);
  const [loading, setLoading] = useState(true);

  const type = location.pathname.includes('/category/') 
    ? 'Category' 
    : location.pathname.includes('/area/') 
    ? 'Cuisine' 
    : 'Ingredient';

  useEffect(() => {
    const fetchFiltered = async () => {
      if (!id) return;
      setLoading(true);
      try {
        let res;
        if (type === 'Category') res = await mealApi.filterByCategory(id);
        else if (type === 'Cuisine') res = await mealApi.filterByArea(id);
        else res = await mealApi.filterByIngredient(id);
        
        setMeals(res.meals || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchFiltered();
    window.scrollTo(0, 0);
  }, [id, type]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 space-y-2">
        <p className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest">{type}</p>
        <h1 className="text-4xl font-bold tracking-tight">{id}</h1>
        <p className="text-gray-400 font-medium">Discover our collection of {id} {type.toLowerCase()} meals.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredResults;
