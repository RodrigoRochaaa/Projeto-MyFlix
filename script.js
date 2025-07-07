const $searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("Movie-name");
const movieYear = document.getElementById("Movie-year");
const movieListElement = document.getElementById("movie-list");

let movieList = [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);
    overlay.classList.add("open");
    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    createModal(data);
  } catch (error) {
    notie.alert({ type: 3, text: error.message });
  }
}
function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}
function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }
  if (movieYear.value.length !== 4 || isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido");
  }
  return `&y=${movieYear.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return (
      movieObject.imdbID === id
    ); /*Aqui ele está apenas vendo se existe algum valor .imdID que seja igual ao parâmetro.imdbID que eu colocar pra substituir o ID...Muito bom pra comparar se existe algum elemento já em uma lista*/
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
  movieListElement.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
                <img src="${movieObject.Poster}" alt="Pôster de ${movieObject.Title}">
                <button class="remove-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}"><i class="bi bi-trash"></i>Remover</button>
            </article>`;
}

function removeFilmFromList(id) {
  movieList = movieList.filter(
    (movie) => movie.imdbID !== id
  ); /*Cria uma nova array que vai ter todos os elementos, com exceção do id, retirando assim o objeto dele*/
  document.getElementById(`movie-card-${id}`).remove();
}

$searchButton.addEventListener("click", searchButtonClickHandler);
