"use strict";
//Select button & input
const searchBtn = document.getElementById("search-btn");
const searchField = document.getElementById("search-input");

// Btn Click = Load Data form API
searchBtn.addEventListener("click", function () {
  const searchText = searchField.value;
  searchField.value = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals));
});
// Display Meal Data
const displayMeal = (meals) => {
  const searchResult = document.querySelector("#search-result");
  meals.forEach((meal) => {
    let div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
    <div onclick="loadMealDetails(${meal.idMeal});" class="card">
    <img  src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
    </div>
  </div>
     `;
    searchResult.appendChild(div);
  });
};

// Load Id by meal Details
const loadMealDetails = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};
//Display Meal Details
const displayMealDetails = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.style.maxWidth = "600px";
  div.className = "card mb-3";
  div.innerHTML = `
  <div class="row g-0">
          <div class="col-md-4">
            <img src="${
              meal.strMealThumb
            }" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
              <p class="card-text">
                <small class="text-muted">${meal.strTags}</small>
              </p>
            </div>
          </div>
        </div>
  `;
  mealDetails.appendChild(div);
};
