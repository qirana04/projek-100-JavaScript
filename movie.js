document.getElementById("searchButton").addEventListener("click", searchMovies);
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") searchMovies();
});

// Dapatkan API Key gratis dari TMDB
const API_KEY = "YOUR_TMDB_API_KEY"; // Ganti dengan API key Anda
const BASE_URL = "https://api.themoviedb.org/3";

function searchMovies() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (!searchTerm) {
        alert("Masukkan judul film!");
        return;
    }

    const loadingElement = document.getElementById("loading");
    const resultsContainer = document.getElementById("results");
    
    loadingElement.classList.remove("hidden");
    resultsContainer.innerHTML = "";

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&language=en-US&page=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            loadingElement.classList.add("hidden");
            if (data.results.length === 0) {
                resultsContainer.innerHTML = "<p class='no-results'>Tidak ada film yang ditemukan. Coba kata kunci lain.</p>";
            } else {
                displayMovies(data.results);
            }
        })
        .catch(error => {
            loadingElement.classList.add("hidden");
            resultsContainer.innerHTML = <p class='error'>Error: ${error.message}. Coba lagi nanti.</p>;
            console.error("Error fetching movies:", error);
        });
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById("results");
    
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster";
        
        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-details">
                    <span class="movie-rating"><i class="fas fa-star"></i> ${movie.vote_average.toFixed(1)}</span>
                    <span class="movie-year">${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span>
                </div>
                <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="view-more">Detail</a>
            </div>
        `;
        
        resultsContainer.appendChild(movieCard);
    });
}

// Optional: Load popular movies when page loads
function loadPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results.slice(0, 12)); // Tampilkan 12 film populer
        })
        .catch(error => {
            console.error("Error fetching popular movies:", error);
        });
}

// Uncomment baris berikut jika ingin menampilkan film populer saat halaman dimuat
// window.addEventListener('DOMContentLoaded', loadPopularMovies);