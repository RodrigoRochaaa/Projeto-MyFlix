const background = document.getElementById("modal-background");
const modalConteiner = document.getElementById("modal-container");
let currentMovie = {};
function backgroundClickHandler() {
  overlay.classList.remove("open");
}

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie.imdbID)) {
    notie.alert({ type: 2, text: "Filme já está na sua lista!" });
    return;
  }
  addToList(currentMovie);
  updateUI(currentMovie);
  removeModal();
}

function createModal(data) {
  currentMovie = data;
  modalConteiner.innerHTML = `
  <h2 id="Movie-Title">${data.Title} - ${data.Year}</h2>
  <section id="modal-body">
    <div id="central-wrapper">
        <div id="movie-poster">
        <img src=${data.Poster}></div>
        <div id="movie-info">
          <h3 id="movie-plot">
           ${data.Plot}</h3>
          <div id="movie-cast">
              <h4>Elenco:</h4>
              <h5>${data.Actors}</h5>
          </div>
          <div id="movie-genre">
              <h4>${data.Genre}</h4>
          <h5>Ação, Aventura, Sci-fi</h5></div>
    
          </div>
        </div>
            <section id="modal-footer">
            <button id="add-to-list" onclick='{addCurrentMovieToList()}'>Adcionar a lista</button>
            </section>`;
}
background.addEventListener(
  "click",
  backgroundClickHandler
); /*Evento que se cria ao click, no caso, chama a função*/

function removeModal() {
  overlay.classList.remove("open");
}
