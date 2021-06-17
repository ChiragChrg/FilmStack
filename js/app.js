const API = 34878906;
const Search = document.querySelector("#searchbar input");
const Active = document.querySelector(".active");
const SrchInfo = document.querySelector(".searchInfo");
const SrchLoad = document.querySelector(".searchload");
const Cards = document.querySelector(".cards");

// Dashboard initialize
const Card1 = document.querySelector(".card1");
const Card2 = document.querySelector(".card2");
const Card3 = document.querySelector(".card3");
const Card4 = document.querySelector(".card4");
const Card5 = document.querySelector(".card5");
const Card6 = document.querySelector(".card6");
const Card7 = document.querySelector(".card7");
const Card8 = document.querySelector(".card8");
const Card9 = document.querySelector(".card9");
const Card10 = document.querySelector(".card10");

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

// Mobile Nav
function openNav() {
  document.getElementById("sidepanel").style.width = "50%";
}

function closeNav() {
  document.getElementById("sidepanel").style.width = "0%";
}

// Dashboard Info Cards
async function dashinfo() {
  SrchInfo.style.display = "none";
  let d1 = "Mugen Train";
  let d2 = "Avatar";
  let d3 = "Avengers endgame";
  let d4 = "Bad Boys for life";
  let d5 = "Dolittle";
  let d6 = "Shock wave 2";
  let d7 = "Tanhaji";
  let d8 = "The Invisible Man";
  let d9 = "Tenet";
  let d10 = "Sonic the Hedgehog";
  let x1 = await fetch(`https://www.omdbapi.com/?t=${d1}&apikey=${API}`);
  let x2 = await fetch(`https://www.omdbapi.com/?t=${d2}&apikey=${API}`);
  let x3 = await fetch(`https://www.omdbapi.com/?t=${d3}&apikey=${API}`);
  let x4 = await fetch(`https://www.omdbapi.com/?t=${d4}&apikey=${API}`);
  let x5 = await fetch(`https://www.omdbapi.com/?t=${d5}&apikey=${API}`);
  let x6 = await fetch(`https://www.omdbapi.com/?t=${d6}&apikey=${API}`);
  let x7 = await fetch(`https://www.omdbapi.com/?t=${d7}&apikey=${API}`);
  let x8 = await fetch(`https://www.omdbapi.com/?t=${d8}&apikey=${API}`);
  let x9 = await fetch(`https://www.omdbapi.com/?t=${d9}&apikey=${API}`);
  let x10 = await fetch(`https://www.omdbapi.com/?t=${d10}&apikey=${API}`);
  let data1 = await x1.json();
  let data2 = await x2.json();
  let data3 = await x3.json();
  let data4 = await x4.json();
  let data5 = await x5.json();
  let data6 = await x6.json();
  let data7 = await x7.json();
  let data8 = await x8.json();
  let data9 = await x9.json();
  let data10 = await x10.json();
  // console.log(data6);
  const Movies = [
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
  ];
  displayData(Movies);
}
window.onload = dashinfo();

function displayData(Movies) {
  Card1.innerHTML = `<img class="dashimg" src="${Movies[0].Poster}" alt="Poster" onclick="SearchData('${Movies[0].Title}')"><h4><br/>${Movies[0].Title}</h4>`;
  Card2.innerHTML = `<img class="dashimg" src="${Movies[1].Poster}" alt="Poster" onclick="SearchData('${Movies[1].Title}')"><h4><br/>${Movies[1].Title}</h4>`;
  Card3.innerHTML = `<img class="dashimg" src="${Movies[2].Poster}" alt="Poster" onclick="SearchData('${Movies[2].Title}')"><h4><br/>${Movies[2].Title}</h4>`;
  Card4.innerHTML = `<img class="dashimg" src="${Movies[3].Poster}" alt="Poster" onclick="SearchData('${Movies[3].Title}')"><h4><br/>${Movies[3].Title}</h4>`;
  Card5.innerHTML = `<img class="dashimg" src="${Movies[4].Poster}" alt="Poster" onclick="SearchData('${Movies[4].Title}')"><h4><br/>${Movies[4].Title}</h4>`;
  Card6.innerHTML = `<img class="dashimg" src="${Movies[5].Poster}" alt="Poster" onclick="SearchData('${Movies[5].Title}')"><h4><br/>${Movies[5].Title}</h4>`;
  Card7.innerHTML = `<img class="dashimg" src="${Movies[6].Poster}" alt="Poster" onclick="SearchData('${Movies[6].Title}')"><h4><br/>${Movies[6].Title}</h4>`;
  Card8.innerHTML = `<img class="dashimg" src="${Movies[7].Poster}" alt="Poster" onclick="SearchData('${Movies[7].Title}')"><h4><br/>${Movies[7].Title}</h4>`;
  Card9.innerHTML = `<img class="dashimg" src="${Movies[8].Poster}" alt="Poster" onclick="SearchData('${Movies[8].Title}')"><h4><br/>${Movies[8].Title}</h4>`;
  Card10.innerHTML = `<img class="dashimg" src="${Movies[9].Poster}" alt="Poster" onclick="SearchData('${Movies[9].Title}')"><h4><br/>${Movies[9].Title}</h4>`;
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
    .then(data => {
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
        SrchInfo.style.display = "grid";
        Cards.style.display = "none";
      }

      function screenSize(x) {
        if (x.matches) {
          // Hiding dashinfo & displaying search result

          Active.style.borderRadius = "50px";
          Active.style.backgroundColor = "transparent";
          Active.style.color = "#fff";

          Active.addEventListener("mouseenter", e => {
            Active.style.borderRadius = "0px 55px 10px 35px";
            Active.style.backgroundColor = "#fff";
            Active.style.color = "#000";
          });
          Active.addEventListener("mouseleave", e => {
            Active.style.borderRadius = "50px";
            Active.style.backgroundColor = "transparent";
            Active.style.color = "#fff";
          });
          // ...
        } else {
          Active.style.backgroundColor = "#2b4eec";
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
  // SrchInfo.style.backgroundImage = url("${xData.poster}");
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
