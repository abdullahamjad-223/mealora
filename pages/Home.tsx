
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { mealApi } from '../services/mealApi';
import { Category, Meal } from '../types';
import MealCard from '../components/MealCard';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const [catRes] = await Promise.all([
          mealApi.getCategories(),
        ]);
        setCategories(catRes.categories || []);
        
        // Exact IDs from reference if possible, or representative ones
        // Teriyaki Chicken, Spaghetti, Burger, Pancakes
        const trendingIds = ['52772', '52844', '52977', '52854'];
        const trendings = await Promise.all(
          trendingIds.map(id => mealApi.getMealById(id))
        );
        setFeaturedMeals(trendings.map(t => t.meals[0]));
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${searchVal.trim()}`);
    }
  };

  const handleRandom = async () => {
    const res = await mealApi.getRandomMeal();
    navigate(`/meal/${res.meals[0].idMeal}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-[5px] border-[#ff7a1b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section - Exactly like reference */}
      <section className="relative h-[720px] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2400&auto=format&fit=crop"
            alt="Hero Food Background"
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 max-w-5xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <h1 className="text-[48px] md:text-[72px] font-[900] text-white leading-[1.05] tracking-tight">
            Discover Delicious Recipes <br className="hidden lg:block" /> Instantly
          </h1>
          <p className="text-[17px] md:text-[20px] text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore thousands of meals from around the world. What are you cooking today?
          </p>
          
          <div className="pt-6 w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative bg-white rounded-full p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] flex items-center">
              <div className="pl-6 pr-4 text-gray-400">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Search by meal name..."
                className="flex-1 bg-transparent py-4 text-[17px] font-semibold focus:outline-none placeholder:text-gray-400"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button 
                type="submit"
                className="orange-gradient-btn text-white px-10 py-4 rounded-full font-extrabold text-[17px] shadow-lg shadow-[#ff7a1b]/20"
              >
                Search
              </button>
            </form>
            
            <button 
              onClick={handleRandom}
              className="mt-8 text-white text-[16px] font-extrabold flex items-center gap-2 mx-auto hover:gap-3 transition-all duration-300 border-b-2 border-white/40 pb-1 hover:border-white"
            >
              Show me a random recipe <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-32 mt-24">
        {/* Categories Section */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-3">
              <h2 className="text-[36px] font-[900] tracking-tight text-[#1a1a1a]">Browse by Category</h2>
              <p className="text-gray-400 text-[18px] font-semibold">Find the perfect meal for any craving</p>
            </div>
            <Link to="/search" className="flex items-center gap-2 text-[#ff7a1b] font-extrabold text-[16px] group transition-all">
              View all categories <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.idCategory}
                to={`/category/${cat.strCategory}`}
                className="group relative h-56 rounded-[28px] overflow-hidden luxury-shadow transition-all duration-500 hover:-translate-y-3"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-[900] text-[20px] tracking-tight">{cat.strCategory}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-3">
              <h2 className="text-[36px] font-[900] tracking-tight text-[#1a1a1a]">Trending Now</h2>
              <p className="text-gray-400 text-[18px] font-semibold">Popular recipes from our community this week</p>
            </div>
            <Link to="/search" className="flex items-center gap-2 text-[#ff7a1b] font-extrabold text-[16px] group transition-all">
              View all recipes <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </section>

        {/* Surprise Callout */}
        <section className="bg-slate-50 rounded-[48px] p-16 text-center border border-slate-100">
           <h2 className="text-[32px] font-[900] mb-6">Can't decide what to eat?</h2>
           <p className="text-slate-500 text-[18px] max-w-xl mx-auto mb-10 font-semibold">
             Let us choose for you. We'll find a random delicious recipe from our global database.
           </p>
           <button 
             onClick={handleRandom}
             className="px-12 py-5 bg-[#ff7a1b] text-white rounded-2xl font-[900] text-[18px] shadow-2xl shadow-[#ff7a1b]/30 hover:bg-[#f06a0a] transition-all transform hover:scale-105"
           >
             Get a Random Recipe
           </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
