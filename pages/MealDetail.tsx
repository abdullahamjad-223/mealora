
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Youtube, 
  ExternalLink, 
  Heart, 
  ChevronLeft, 
  Share2,
  CheckCircle2,
  Clock,
  Users,
  UtensilsCrossed
} from 'lucide-react';
import { mealApi, getIngredientThumb } from '../services/mealApi';
import { Meal } from '../types';

const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        if (!id) return;
        const res = await mealApi.getMealById(id);
        if (res.meals?.[0]) {
          setMeal(res.meals[0]);
          const favs = JSON.parse(localStorage.getItem('mealora_favs') || '[]');
          setIsFavorite(favs.some((f: any) => f.idMeal === res.meals[0].idMeal));
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMeal();
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFavorite = () => {
    if (!meal) return;
    const favs = JSON.parse(localStorage.getItem('mealora_favs') || '[]');
    let newFavs;
    if (isFavorite) {
      newFavs = favs.filter((f: any) => f.idMeal !== meal.idMeal);
    } else {
      newFavs = [...favs, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }];
    }
    localStorage.setItem('mealora_favs', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!meal) return <div className="text-center py-20">Meal not found.</div>;

  // Extract ingredients and measures
  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}` as keyof Meal],
    measure: meal[`strMeasure${i + 1}` as keyof Meal],
  })).filter(item => item.name && (item.name as string).trim() !== '');

  const tags = meal.strTags ? meal.strTags.split(',') : [];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ChevronLeft size={20} /> Back to explore
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap gap-2">
                   <Link to={`/category/${meal.strCategory}`} className="px-3 py-1 bg-[#ff6b35] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                     {meal.strCategory}
                   </Link>
                   <Link to={`/area/${meal.strArea}`} className="px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                     {meal.strArea}
                   </Link>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">{meal.strMeal}</h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-white/60 text-xs font-medium border border-white/20 px-2 py-0.5 rounded-lg">#{tag.trim()}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleFavorite}
                  className={`p-4 rounded-2xl flex items-center gap-2 font-bold transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-[#1a1a1a] hover:bg-gray-100'}`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </button>
                <button className="p-4 bg-white/10 backdrop-blur rounded-2xl text-white hover:bg-white/20 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Stats Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 luxury-shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8 items-center justify-center md:justify-start">
           <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
             <Clock size={18} className="text-[#ff6b35]" />
             <span>45-60 min</span>
           </div>
           <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
             <Users size={18} className="text-[#ff6b35]" />
             <span>4 Servings</span>
           </div>
           <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
             <UtensilsCrossed size={18} className="text-[#ff6b35]" />
             <span>Moderate Skill</span>
           </div>
           <div className="flex-1 hidden md:block" />
           <div className="flex items-center gap-4">
              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-bold hover:bg-red-100 transition-colors">
                  <Youtube size={16} /> Watch Video
                </a>
              )}
              {meal.strSource && (
                <a href={meal.strSource} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
                  <ExternalLink size={16} /> Recipe Source
                </a>
              )}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Ingredients */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Ingredients <span className="text-sm font-normal text-gray-400">({ingredients.length} items)</span>
              </h2>
              <div className="space-y-4">
                {ingredients.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#fff7ed] transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl luxury-shadow flex items-center justify-center p-2">
                       <img 
                        src={getIngredientThumb(item.name as string)} 
                        alt={item.name as string}
                        className="w-full h-full object-contain"
                       />
                    </div>
                    <div className="flex-1 border-b border-gray-100 pb-2 group-last:border-0">
                      <p className="text-sm font-bold text-[#1a1a1a]">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.measure}</p>
                    </div>
                    <CheckCircle2 size={18} className="text-gray-200 group-hover:text-[#ff6b35] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {meal.dateModified && (
              <div className="p-6 bg-gray-50 rounded-3xl text-center">
                 <p className="text-xs text-gray-400">Last updated on {new Date(meal.dateModified).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-8">Instructions</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line space-y-6">
                {meal.strInstructions.split('\r\n').filter(p => p.trim()).map((para, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="flex-1 pt-1">{para}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Share CTA */}
            <div className="bg-[#1a1a1a] rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold">Love this recipe?</h3>
                  <p className="text-gray-400">Save it to your cookbook or share with friends.</p>
               </div>
               <div className="flex gap-4">
                  <button onClick={toggleFavorite} className="px-8 py-3 bg-[#ff6b35] rounded-full font-bold hover:bg-[#e85a2b] transition-colors">Save to Favorites</button>
                  <button className="px-8 py-3 bg-white/10 rounded-full font-bold hover:bg-white/20 transition-colors">Share Recipe</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
