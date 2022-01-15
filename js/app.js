const API = 34878906;
const dAPI = `https://api.themoviedb.org/3/trending/all/week?api_key=a0b28357cbdc328421290257b579b040`;
const Search = document.querySelector("#searchbar input");
const Active = document.querySelector(".active");
const MovieInfo = document.querySelector(".movieInfo");
const SrchLoad = document.querySelector(".searchload");
const Cards = document.querySelector(".cards");
const Loader = document.querySelector(".loader");

// Search Value initialize
const Poster = document.querySelector(".poster");
const Title = document.querySelector(".title");
const Rated = document.querySelector(".rated");
const Ratings = document.querySelector(".ratings");
const Year = document.querySelector(".year");
const Release = document.querySelector(".release");
const Director = document.querySelector(".director");
const Writer = document.querySelector(".writer");
const Genre = document.querySelector(".genre");
const Lang = document.querySelector(".lang");
const Country = document.querySelector(".country");
const Actors = document.querySelector(".actors");
const Plot = document.querySelector(".plot");
const Awards = document.querySelector(".awards");

//fetch list of trending movies from dAPI
async function trending() {
  let x = await fetch(dAPI);
  let data = await x.json();
  // console.log(data);
  const Movies = data.results;
  displayTrend(Movies);
}
window.onload = trending();

// Trending Card info
function displayTrend(Movies) {
  Loader.style.display = "none";

  for (let i = 0; i < Movies.length; i++) {
    // Some movie title Object names are diffrent so Sorting here..
    if (Movies[i].original_title) {
      var title = Movies[i].original_title;
    } else if (Movies[i].name) {
      var title = Movies[i].name;
    }

    Cards.innerHTML += `<div class="card">
    <img class="cardimg" src="http://image.tmdb.org/t/p/w342/${Movies[i].poster_path}" alt="Poster" onclick="SearchData('${title}')"><h4>${title}</h4>
    </div>`;
  }
}

// Manual Search
Search.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    SearchData(Search.value);
  }
}

function SearchData(query) {
  SrchLoad.style.visibility = "visible";

  async function getdata() {
    let x = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${API}`);
    let data = await x.json();
    console.log(data);
    if (!x.ok) {
      alert(`${x.status} error has occured!`);
    }
    return data;
  }

  getdata()
    .then((data) => {
      if (data.Response == "False") {
        // console.log("error desu");
        console.log(data.Error);
        alert(" ' " + query + " ' " + data.Error);
        SrchLoad.style.visibility = "hidden";
        return;
      } else {
        // console.log("pong");
        // Search.value = "";
        SrchLoad.style.visibility = "hidden";
        MovieInfo.style.display = "grid";
        Cards.style.display = "none";
      }

      function screenSize(x) {
        if (x.matches) {
          // Hiding dashinfo & displaying search result
          Active.style.borderRadius = "50px";
          Active.style.backgroundColor = "transparent";
          Active.style.color = "#fff";

          Active.addEventListener("mouseenter", (e) => {
            Active.style.borderRadius = "0px 55px 10px 35px";
            Active.style.backgroundColor = "#fff";
            Active.style.color = "#000";
          });
          Active.addEventListener("mouseleave", (e) => {
            Active.style.borderRadius = "50px";
            Active.style.backgroundColor = "transparent";
            Active.style.color = "#fff";
          });
          // ...
        } else {
          Active.style.backgroundColor = "#dodgerblue";
          Active.style.color = "#fff";
        }
      }
      var x = window.matchMedia("(min-width: 750px)");
      screenSize(x);
      // x.addListener(screenSize);
      x.addEventListener("change", screenSize);

      let title = data.Title;
      let year = data.Year;
      let rated = data.Rated;
      let released = data.Released;
      let runtime = data.Runtime;
      let genre = data.Genre;
      let director = data.Director;
      let writer = data.Writer;
      let actors = data.Actors;
      let plot = data.Plot;
      let lang = data.Language;
      let country = data.Country;
      let awards = data.Awards;
      let poster = data.Poster;
      let ratings = data.Ratings[0].Value;
      const xData = {
        title,
        year,
        rated,
        released,
        runtime,
        genre,
        director,
        writer,
        actors,
        plot,
        lang,
        country,
        awards,
        poster,
        ratings,
      };
      display(xData);
      // console.log(plot);
      // display();
    })
    .catch(() => {
      console.log("Invalid Search !");
      alert(
        `Movie information is currently unavailable. \nWe are working on this.`
      );
      SrchLoad.style.visibility = "hidden";
    });
}

function display(xData) {
  MovieInfo.style.display = "block";
  window.scrollTo(0, 0); //Go back to top of page

  // MovieInfo.style.backgroundImage = url("${xData.poster}");
  Poster.innerHTML = `<img src="${xData.poster}" alt="${xData.title}" />`;
  Title.innerHTML = `<h2>${xData.title}</h2>`;
  Rated.innerHTML = `<h3>${xData.rated}</h3>`;
  Ratings.innerHTML = `<h4>Ratings:  ${xData.ratings}</h4>`;
  Year.innerHTML = `<h4>Year: ${xData.year}</h4>`;
  Release.innerHTML = `<h4>Released: ${xData.released}</h4>`;
  Director.innerHTML = `<h4>Director: <br/> ${xData.director}</h4>`;
  Writer.innerHTML = `<h4>Writers: <br/> ${xData.writer}</h4>`;
  Genre.innerHTML = `<h4>Genre: ${xData.genre}</h4>`;
  Lang.innerHTML = `<h4>Languages: ${xData.lang}</h4>`;
  Country.innerHTML = `<h4>Country: ${xData.country}</h4>`;
  Actors.innerHTML = `<h4>Actors: <br/> ${xData.actors}</h4>`;
  Plot.innerHTML = `<h4>Plot: <br/> ${xData.plot}</h4>`;
  Awards.innerHTML = `<h4>Awards: <br/>${xData.awards}</h4>`;
}

//Back Button to Dashboard from Movie Info
function goback() {
  MovieInfo.style.display = "none";
  Cards.style.display = "grid";
  window.scrollTo(0, 0);
}
