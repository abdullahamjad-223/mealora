# AI_PROMPTS.md

# Mealora 🍽️
AI Prompt Documentation for Web Engineering Project

This document contains the AI prompts used during the development phase of Mealora. AI tools were used for feature implementation, debugging, testing, UI enhancement, deployment troubleshooting, and code refactoring.

---

# 👨‍💻 Developer Information

- Project Name: Mealora
- Developer: Abdullah Amjad
- Technology Stack: React, TypeScript, Tailwind CSS, Vite
- API Used: TheMealDB API

---

# 📌 Prompt 1 – Recipe Search Functionality

## Prompt
Create a React TypeScript recipe search component that fetches recipe data from the MealDB API and displays recipe cards dynamically with loading and error states.

## Purpose
To implement the main recipe search feature.

## AI Contribution
- Search input component
- Fetch API logic
- Loading spinner
- Dynamic rendering

## Manual Improvements
- Added debounce optimization
- Improved TypeScript typings
- Added reusable API service layer

---

# 📌 Prompt 2 – Category Filtering System

## Prompt
Generate a responsive category filtering section using React and Tailwind CSS that displays meal categories from the MealDB API and filters recipes dynamically.

## Purpose
To separate recipes into categories.

## AI Contribution
- Category API integration
- Filtering logic
- Responsive grid UI

## Manual Improvements
- Added animations
- Fixed duplicate renders
- Optimized state management

---

# 📌 Prompt 3 – Favorites Feature

## Prompt
Help me build a favorites functionality in React using localStorage where users can add and remove favorite recipes.

## Purpose
To allow users to save recipes.

## AI Contribution
- localStorage integration
- Favorite toggle logic
- State synchronization

## Manual Improvements
- Added duplicate prevention
- Added empty favorites state
- Improved UI responsiveness

---

# 📌 Prompt 4 – Recipe Details Page

## Prompt
Create a detailed recipe page in React that displays recipe image, ingredients, cooking instructions, and YouTube tutorial from MealDB API.

## Purpose
To display complete recipe information.

## AI Contribution
- Dynamic routing
- Recipe detail fetching
- Ingredient mapping

## Manual Improvements
- Added conditional rendering
- Improved layout spacing
- Fixed undefined ingredient values

---

# 📌 Prompt 5 – YouTube Video Integration

## Prompt
Generate a responsive YouTube embed component for recipe tutorials using React and Tailwind CSS.

## Purpose
To integrate cooking tutorial videos.

## AI Contribution
- iframe embedding
- Responsive video container

## Manual Improvements
- Added fallback UI
- Added accessibility improvements

---

# 📌 Prompt 6 – Error Handling Improvements

## Prompt
Improve API error handling in my React TypeScript application and display user-friendly messages for failed requests.

## Purpose
To improve application stability.

## AI Contribution
- Error boundaries suggestions
- Try/catch improvements
- Error UI states

## Manual Improvements
- Added reusable error components
- Improved retry behavior

---

# 📌 Prompt 7 – Responsive UI Redesign

## Prompt
Redesign my recipe cards and homepage using modern food-app inspired UI with Tailwind CSS and smooth hover animations.

## Purpose
To improve user experience and visual design.

## AI Contribution
- Modern card layouts
- Tailwind utility classes
- Hover effects

## Manual Improvements
- Customized gradients
- Improved typography
- Added mobile responsiveness

---

# 📌 Prompt 8 – Unit Testing

## Prompt
Generate unit tests for my React components using Vitest and React Testing Library including recipe cards, search functionality, and favorites.

## Purpose
To implement testing requirements.

## AI Contribution
- Test skeletons
- Mock API examples
- Render tests

## Manual Improvements
- Added edge case testing
- Added async testing fixes
- Added localStorage mocks

---

# 📌 Prompt 9 – End-to-End Testing

## Prompt
Create a Playwright E2E test that tests searching recipes, opening recipe details, and adding recipes to favorites.

## Purpose
To test full user interaction flow.

## AI Contribution
- Playwright setup
- User flow testing
- Async waits

## Manual Improvements
- Fixed selectors
- Improved reliability
- Added route handling

---

# 📌 Prompt 10 – Deployment Troubleshooting

## Prompt
My React Vite application works locally but shows routing errors after deployment on Vercel. Help me fix it step-by-step.

## Purpose
To solve production deployment issues.

## AI Contribution
- Suggested vercel.json configuration
- Environment variable fixes
- SPA routing support

## Manual Improvements
- Added rewrite rules
- Fixed Vite environment variables

---

# 📊 AI Usage Summary

| Area | AI Assistance |
|------|------|
| Feature Development | Yes |
| Debugging | Yes |
| UI Design | Yes |
| Testing | Yes |
| Deployment | Yes |
| Refactoring | Yes |

---

# 📌 Key Learning from AI-Assisted Development

AI accelerated development significantly, especially during feature implementation and debugging. However, all generated code required manual verification and testing.

The most important lesson learned was that AI works best when:
- Prompts are detailed
- Requirements are specific
- Human review is continuous
- Testing is performed regularly

AI improved productivity but did not replace the need for developer understanding and decision-making.