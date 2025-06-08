document.getElementById("searchButton").addEventListener("click", searchRecipes);

// Anda perlu mendapatkan API ID dan Key dari Edamam (gratis)
const APP_ID = "YOUR_APP_ID"; // Ganti dengan APP ID Anda
const APP_KEY = "YOUR_APP_KEY"; // Ganti dengan APP KEY Anda

function searchRecipes() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (!searchTerm) {
        alert("Masukkan bahan atau nama resep!");
        return;
    }

    const loadingElement = document.getElementById("loading");
    const resultsContainer = document.getElementById("results");
    
    loadingElement.classList.remove("hidden");
    resultsContainer.innerHTML = "";

    const url = `https://api.edamam.com/search?q=${encodeURIComponent(searchTerm)}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            loadingElement.classList.add("hidden");
            if (data.hits.length === 0) {
                resultsContainer.innerHTML = "<p class='no-results'>Tidak ada resep ditemukan. Coba kata kunci lain.</p>";
            } else {
                displayRecipes(data.hits);
            }
        })
        .catch(error => {
            loadingElement.classList.add("hidden");
            resultsContainer.innerHTML = <p class='error'>Error: ${error.message}. Coba lagi nanti.</p>;
            console.error("Error fetching recipes:", error);
        });
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById("results");
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        
        recipeCard.innerHTML = `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" class="recipe-img">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.recipe.label}</h3>
                <p class="recipe-calories">${Math.round(recipe.recipe.calories)} kalori</p>
                <p class="recipe-ingredients">
                    <strong>Bahan utama:</strong> ${recipe.recipe.ingredientLines.slice(0, 3).join(", ")}
                </p>
                <a href="${recipe.recipe.url}" target="_blank" class="view-recipe">Lihat Resep</a>
            </div>
        `;
        
        resultsContainer.appendChild(recipeCard);
    });
}

// Optional: Search when pressing Enter
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchRecipes();
    }
});