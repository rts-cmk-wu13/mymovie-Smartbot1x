async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d12127704e6ac384c371c0b5b11426b4&language=en-US`,
      { headers: { accept: "application/json" } }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

async function fetchMovieCredits(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d12127704e6ac384c371c0b5b11426b4`,
      { headers: { accept: "application/json" } }
    );
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
}

async function fetchMovieVideos(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d12127704e6ac384c371c0b5b11426b4&language=en-US`,
      { headers: { accept: "application/json" } }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
}

async function displayMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    document.querySelector(".movie-details").innerHTML = "<p>Movie not found.</p>";
    return;
  }

  const movie = await fetchMovieDetails(movieId);
  const cast = await fetchMovieCredits(movieId);
  const videos = await fetchMovieVideos(movieId);

  if (!movie) {
    document.querySelector(".movie-details").innerHTML = "<p>Error loading movie details.</p>";
    return;
  }

  const backdrop = document.querySelector(".movie-backdrop");
  backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;

  document.querySelector(".movie-title").textContent = movie.title  ;
  document.querySelector(".movie-rating span").textContent = `${movie.vote_average.toFixed(1)}/10 IMDb`;

  const genresContainer = document.querySelector(".movie-genres");
  genresContainer.innerHTML = movie.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join("");

  const runtime = movie.runtime;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  document.getElementById("movie-length").textContent = `${hours}h ${minutes}min`;
  document.getElementById("movie-language").textContent = movie.spoken_languages[0]?.name || "N/A";
  document.getElementById("movie-rating").textContent = movie.certification || "N/A";
  

  document.getElementById("movie-overview").textContent = movie.overview;

  const castList = document.getElementById("cast-list");
  castList.innerHTML = cast.slice(0, 8).map(actor => `
    <div class="cast-item">
      <img src="${actor.profile_path ? `https://image.tmdb.org/t/p/w92${actor.profile_path}` : 'https://via.placeholder.com/92x138'}" alt="${actor.name}">
      
      <p>${actor.name}</p>
      <br>
      <br>
      <p class="characters">${actor.character}</p>
       
    </div>
  `).join("");

  const playButton = document.querySelector(".play-button");
  const trailerContainer = document.getElementById("trailer-container");
  const trailerPlayer = document.getElementById("trailer-player");
  const closeButton = document.querySelector(".close-button");

  const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube" && video.official);
  if (trailer) {
    playButton.onclick = () => {
      trailerContainer.style.display = "block";
      trailerPlayer.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
      playButton.style.display = "none";
    }; 
    

    closeButton.onclick = () => {
      trailerContainer.style.display = "none";
      trailerPlayer.src = "";
      playButton.style.display = "flex";
    };
  } else {
    playButton.style.display = "none";
    console.log("No official trailer available for this movie.");
  }
}

window.onload = () => {
  displayMovieDetails();
};