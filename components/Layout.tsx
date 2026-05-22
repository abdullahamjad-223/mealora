import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChefHat, 
  Search, 
  Heart, 
  Menu,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import { mealApi } from '../services/mealApi';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
          
          {/* Logo */}
          <div className="flex items-center h-full">
            <img
              src="/logo.svg"
              alt="Logo"
              // className="h-24 w-auto" // slightly smaller than navbar height
              className="h-[7rem] w-auto" // 7rem height
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-[15px] font-bold text-[#1a1a1a] hover:text-[#ff7a1b] transition-colors">Home</Link>
            <Link to="/search" className="text-[15px] font-bold text-[#1a1a1a] hover:text-[#ff7a1b] transition-colors">Categories</Link>
            <Link to="/" className="text-[15px] font-bold text-[#1a1a1a] hover:text-[#ff7a1b] transition-colors">About</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-[#1a1a1a]">
              <Search size={22} />
            </button>
            <Link to="/favorites" className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors text-[#1a1a1a]">
              <Heart size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ff7a1b] border-2 border-white rounded-full"></span>
            </Link>
            <button 
              className="p-2.5 bg-[#ff7a1b] text-white rounded-full hover:bg-[#f06a0a] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={22} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-8 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-4 duration-300">
            <Link to="/" className="text-xl font-bold">Home</Link>
            <Link to="/search" className="text-xl font-bold">Categories</Link>
            <Link to="/favorites" className="text-xl font-bold">My Favorites</Link>
            <button 
              onClick={async () => {
                const res = await mealApi.getRandomMeal();
                navigate(`/meal/${res.meals[0].idMeal}`);
              }}
              className="w-full py-4 bg-[#ff7a1b] text-white rounded-xl font-bold"
            >
              Surprise Me
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 mt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

            {/* About Section */}
            <div className="space-y-6">
              
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-xs">
                Discover, cook, and enjoy thousands of recipes from around the world. Your daily dose of culinary inspiration.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="font-bold text-lg mb-8">Explore</h4>
              <div className="flex flex-col gap-4 text-[15px] text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Trending</Link>
                <Link to="/search" className="hover:text-white transition-colors">Categories</Link>
                <button 
                  onClick={async () => {
                    const res = await mealApi.getRandomMeal();
                    navigate(`/meal/${res.meals[0].idMeal}`);
                  }}
                  className="text-left hover:text-white transition-colors"
                >
                  Random Meal
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-lg mb-8">Company</h4>
              <div className="flex flex-col gap-4 text-[15px] text-slate-400">
                <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
                <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-lg mb-8">Social</h4>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                  <button key={idx} className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ff7a1b] transition-all duration-300">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 MealExplorer. All rights reserved.</p>
            <p className="hover:text-slate-400 transition-colors cursor-pointer">Powered by TheMealDB API</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
