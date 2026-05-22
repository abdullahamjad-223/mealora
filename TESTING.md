# TESTING.md

## Testing Strategy – Mealora 🍽️

Mealora uses both unit testing and end-to-end testing to ensure application stability, functionality, and reliability.

---

# 🧪 Testing Tools

| Type | Tool |
|------|------|
| Unit Testing | Vitest |
| Component Testing | React Testing Library |
| E2E Testing | Playwright |

---

# ✅ Unit Test Cases

## 1. Recipe Search Component

### Test Objective
Ensure users can search recipes successfully.

### Test Cases
- Search input renders correctly
- API fetch is triggered on user input
- Recipe cards display after search
- Empty results message displays correctly
- API error message renders properly

### Expected Result
Recipes appear dynamically based on user query.

---

## 2. Favorites Functionality

### Test Objective
Ensure users can save and remove favorite recipes.

### Test Cases
- Add recipe to favorites
- Remove recipe from favorites
- Prevent duplicate favorites
- Favorites persist in localStorage
- Empty favorites state displays properly

### Expected Result
Favorites work correctly and persist after page refresh.

---

## 3. Recipe Category Filtering

### Test Objective
Ensure category filtering displays correct recipes.

### Test Cases
- Category buttons render
- Clicking category filters recipes
- Active category updates UI
- Invalid category handled gracefully

### Expected Result
Only recipes from selected category display.

---

## 4. YouTube Tutorial Component

### Test Objective
Ensure tutorial videos render correctly.

### Test Cases
- YouTube iframe renders
- Valid video URL displays correctly
- Missing tutorial handled gracefully

### Expected Result
Recipe tutorial videos display responsively.

---

# 🌐 End-to-End Testing

## E2E Test Scenario

### Objective
Test complete user interaction flow.

### User Flow
1. Open Mealora application
2. Search for a recipe
3. Open recipe details
4. Add recipe to favorites
5. Navigate to favorites page
6. Verify recipe exists in favorites

### Expected Result
Entire flow works without errors.

---

# 🐞 Bugs Found During Testing

| Issue | Solution |
|------|------|
| Duplicate favorite items | Added duplicate checks |
| API undefined data crash | Added optional chaining |
| Responsive layout issues | Fixed Tailwind breakpoints |
| E2E timing failures | Added proper async waits |

---

# ✅ Final Testing Status

| Test Type | Status |
|------|------|
| Unit Tests | Passed |
| E2E Tests | Passed |
| API Testing | Passed |
| Responsive Testing | Passed |

---

# 📌 Conclusion

Testing helped ensure Mealora remained stable during AI-assisted development. AI-generated tests accelerated development, but manual review and debugging were necessary to verify correctness and edge cases.