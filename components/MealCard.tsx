
import React from 'react';
import { Link } from 'react-router-dom';
import { FilteredMeal, Meal } from '../types';

interface MealCardProps {
  meal: FilteredMeal | Meal;
  isFavorite?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const isDetailed = 'strCategory' in meal;

  return (
    <div className="group bg-white rounded-[24px] overflow-hidden luxury-shadow luxury-shadow-hover transition-all duration-500 flex flex-col h-full border border-gray-50">
      {/* Image Area with Badge */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isDetailed && (
          <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-extrabold text-[#1a1a1a] shadow-sm">
            {meal.strArea}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        {isDetailed && (
          <span className="text-[12px] font-extrabold text-[#ff7a1b] uppercase tracking-widest mb-2">
            {meal.strCategory}
          </span>
        )}
        
        <h3 className="text-[20px] font-extrabold leading-tight text-[#1a1a1a] mb-6 line-clamp-2">
          {meal.strMeal}
        </h3>

        <div className="mt-auto space-y-6">
          {/* Mock stats as per reference */}
          <div className="flex gap-6 text-[13px] text-gray-400 font-bold">
             <span>30 min</span>
             <span>450 kcal</span>
          </div>
          
          <Link 
            to={`/meal/${meal.idMeal}`}
            className="block w-full text-center py-4 bg-[#fdf2f0] text-[#1a1a1a] text-[15px] font-extrabold rounded-[16px] hover:bg-[#ff7a1b] hover:text-white transition-all duration-300"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
