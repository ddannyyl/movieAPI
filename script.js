import { TMDB_API_KEY } from "./key.js";
const movies = document.getElementById("movies");
const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
}

const createMovieTile = (id, poster, title, date, description, runtime, voteAverage, voteCount, expense, productionCompany, category) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const trailer = document.createElement("button");
  const time= document.createElement("h5");
  const average = document.createElement ("h5");
  const count = document.createElement("h5");
  const money = document.createElement("h5");
  const production = document.createElement("h5");
  const sort = document.createElement("h5");
  

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/original/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  trailer.innerText = "Trailer";
  time.innerText = `Movie runtime: ${runtime} mins`;
  average.innerText = `Average rating: ${voteAverage}/10`;
  count.innerText = `${voteCount} votes`;
  money.innerText = `Budget: $${expense}`;
  production.innerText = `Production Company: ${productionCompany}`;
  sort.innerText = `Genre: ${category}`;


  trailer.classList.add("trailer");
  trailer.addEventListener('click', async () => {
    const trailersData = await getTMDBData(`https://api.themoviedb.org/3//movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
    );
   const trailer = trailersData.results.filter((trailer) => {
      return trailer.type === "Trailer";
    });

    !trailer.length
      ? alert("Sorry! No trailers for this film.")
      : window.open(`https://www.youtube.com/watch?v=${trailer[0].key}`)
  })
  details.append(h1);
  details.append(h3);
  details.append(h4);
  details.append(time);
  details.append(average);
  details.append(count);
  details.append(money);
  details.append(production);
  details.append(sort);

  tile.append(img);
  tile.append(details);
  tile.append(trailer);
  return tile;
}

function clearDiv(id) {
  let checkEmpty = document.getElementById(id).innerHTML === "";
  if (checkEmpty) {
    return;
  } else {
    document.getElementById(id).innerHTML = "";
  }
}

async function getData(id) {
  let movie = await getTMDBData(
    `https://api.themoviedb.org/3//movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
  );
  let productionCompanies = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
  );

  const productionCompany = movie.production_companies[0].name;
  const category = movie.genres[0].name;
  const tile = createMovieTile(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.release_date,
    movie.overview,
    movie.runtime,
    movie.vote_average,
    movie.vote_count,
    movie.budget,
    productionCompany,
    category
  );

  movies.appendChild(tile);
  }

document.getElementById("getMovie").addEventListener("click", (e) => {
  clearDiv("movies");
  let movieId = document.getElementById("options").value;
  getData(movieId);
});