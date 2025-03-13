
/* const API_KEY = "d12127704e6ac384c371c0b5b11426b4"; */
import { API_KEY } from "./API.js"; 
function PlayingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`, {
        headers: {
            accept: "application/json"
        }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayHorizontalMovies(data.results);
        })
        .catch(error => {
            console.error("Error fetching now playing movies:", error);
        });
}

function PopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`, {
        headers: { accept: "application/json" }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayVerticalMovies(data.results);
        })
        .catch(error => {
            console.error("Error fetching popular movies:", error);
        });
}

function displayHorizontalMovies(movies) {
    const container = document.getElementById("horizontal-scroll");
    if (!container) {
        console.error("Horizontal scroll container not found!");
        return;
    }
    container.innerHTML = movies
        .map(
            (movie) => `
                <a href="detail.html?id=${movie.id}" class="movie-link">
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/185x278?text=No+Image';">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>${movie.vote_average.toFixed(1)}/10 IMDb</span>
                        </div>
                    </div>
                </a>
            `
        )
        .join("");
}

function displayVerticalMovies(movies) {
    const container = document.getElementById("vertical-scroll");
    if (!container) {
        console.error("Vertical scroll container not found!");
        return;
    }
    container.innerHTML = movies
        .map(
            (movie) => `
                <a href="detail.html?id=${movie.id}" class="movie-link">
                    <div class="vertical-movie-card">
                        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/185x278?text=No+Image';">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>${movie.vote_average.toFixed(1)}/10 IMDb</span>
                        </div>
                    </div>
                </a>
            `
        )
        .join("");
}

window.onload = () => {
   PlayingMovies();
    PopularMovies();
};