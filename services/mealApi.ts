
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealApi = {
  searchByName: async (name: string) => {
    const res = await fetch(`${BASE_URL}/search.php?s=${name}`);
    return res.json();
  },
  searchByLetter: async (letter: string) => {
    const res = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    return res.json();
  },
  getMealById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    return res.json();
  },
  getRandomMeal: async () => {
    const res = await fetch(`${BASE_URL}/random.php`);
    return res.json();
  },
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories.php`);
    return res.json();
  },
  getCategoryList: async () => {
    const res = await fetch(`${BASE_URL}/list.php?c=list`);
    return res.json();
  },
  getAreaList: async () => {
    const res = await fetch(`${BASE_URL}/list.php?a=list`);
    return res.json();
  },
  getIngredientList: async () => {
    const res = await fetch(`${BASE_URL}/list.php?i=list`);
    return res.json();
  },
  filterByIngredient: async (ingredient: string) => {
    const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    return res.json();
  },
  filterByCategory: async (category: string) => {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    return res.json();
  },
  filterByArea: async (area: string) => {
    const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    return res.json();
  },
};

export const getIngredientThumb = (name: string) => 
  `https://www.themealdb.com/images/ingredients/${name}.png`;

export const getMealThumb = (url: string, size: 'preview' | 'medium' | 'large' = 'medium') => {
  if (size === 'preview') return `${url}/preview`;
  return url;
};
