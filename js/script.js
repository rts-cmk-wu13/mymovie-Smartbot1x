/* import { API_KEY } from "./API.js"; */

/* function createHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <div class="wrapper-menu">
            <div class="line-menu half start"></div>
            <div class="line-menu"></div>
            <div class="line-menu half end"></div>
        </div>
        <h1>MyMovie</h1>
        <div class="toggle__container">
            <input type="checkbox" class="checkbox" id="chk" />
            <label class="label" for="chk">
                <div class="ball"></div>
            </label>
        </div>
    `;
    document.body.prepend(header);
} */

function createMainContent() {
    const main = document.createElement("main");
    main.innerHTML = `
        <div id="loading" style="display: none;">Loading...</div>
        <section>
            <div class="section-header">
                <h2 id="">Now Showing</h2>
                <button>see more</button>
            </div>
            <div id="horizontal-scroll" class="horizontal-scroll"></div>
        </section>
        <div id="movies-container"></div>
    `;
    document.body.appendChild(main);
}

function PlayingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`, {
        headers: { accept: "application/json" }
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
            console.log("Popular Movies Data:", data); 
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
    let container = document.getElementById("vertical-scroll");

    // Container for v-scroll
    if (!container) {
        container = document.createElement("div");
        container.id = "vertical-scroll";
        document.getElementById("movies-container").appendChild(container);
    }

    console.log("Movies to display:", movies); 
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
   /*  createHeader(); */
    createMainContent();
    PlayingMovies();
    PopularMovies();
    BurgerMenu(); 
    
};