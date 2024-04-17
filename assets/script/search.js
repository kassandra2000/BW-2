const url = "https://deezerdevs-deezer.p.rapidapi.com/genre/";
const playlistArray = JSON.parse(sessionStorage.getItem("playlistArray"));
const playlistList = document.querySelector(".playlist-list");

if (playlistArray) {
  playlistArray.forEach((playlist) => {
    const playlistTitle = document.createElement("span");
    playlistTitle.textContent = playlist.title;
    playlistList.appendChild(playlistTitle);
  });
}

const fetchGenre = (URL) => {
  fetch(URL, {
    headers: {
      "X-RapidAPI-Key": "8dabdf3addmsh0d719c2e5ac351fp12d8a1jsn78d6a5ffbc86",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((genre) => {
      const row = document.querySelector(".genre-row");
      const col = document.createElement("div");
      const { name, picture } = genre;
      col.classList.add("col");
      const card = document.createElement("div");
      card.id = "card1";
      card.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      card.classList.add("rounded-4", "p-3", "mt-4");
      card.innerHTML = `
        
                      <h3 class="text-white fs-5 fw-bold">${name}</h3>
                      <img src="${picture}" alt="" />
        `;
      col.appendChild(card);
      row.appendChild(col);
    })
    .catch((err) => console.log(err));
};

const form = document.querySelector("form");

const handleSubmit = (event) => {
  event.preventDefault();

  const query = document.querySelector("input").value;
  const URLQuery = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query;
  fetch(URLQuery, {
    headers: {
      "X-RapidAPI-Key": "8dabdf3addmsh0d719c2e5ac351fp12d8a1jsn78d6a5ffbc86",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((query) => {
      console.log(query);
      const { id } = query.data[0].artist;
      const { name, picture } = query.data[0].artist;
      const search = document.querySelector(".search");
      search.innerHTML = ``;
      const col0 = document.createElement("div");
      col0.classList.add("col");
      col0.innerHTML = `
      <h2 class="fw-bold text-white fs-4">Risultato più rilevante</h2>
      `;
      const divRelevant = document.createElement("div");
      divRelevant.id = "relevant-result";
      divRelevant.classList.add("p-3", "rounded-4", "mt-2");
      divRelevant.innerHTML = ``;
      divRelevant.innerHTML = `
      <img src="${picture}" class="rounded-circle" />
      <h3 class="fw-bold text-white fs-2">${name}</h3>
      <p class="fs-5 text-white">Artista</p>
      `;
      col0.appendChild(divRelevant);
      search.appendChild(col0);
      divRelevant.addEventListener("click", () => {
        window.location.href = "./artist.html?id=" + id;
      });

      const songs = document.createElement("div");
      songs.classList.add("col", "songs");
      songs.innerHTML = `
      <h2 class="fw-bold text-white fs-4">Brani</h2>
      `;
      for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.classList.add("row", "mt-2", "relevant-songs-row");
        const col1 = document.createElement("div");
        col1.classList.add("col-1", "p-2");
        const col11 = document.createElement("div");
        col11.classList.add("col-11");
        const { cover_small } = query.data[i].album;
        const { title_short, duration } = query.data[i];
        const { name } = query.data[i].artist;
        const minute = Math.floor(duration / 60);
        let seconds = duration % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        console.log(cover_small);
        col1.innerHTML = `
        <img id="relevant-image" src="${cover_small}" />
        `;
        col11.innerHTML = `
        <div class="row p-2">
        <div class="col-10">
        <h5 class="fw-semibold text-white mb-0 ms-2">${title_short}</h5>
        <a href="#" class=" mb-0 ms-2">${name}</a>
        </div>
        <div class="col-2">
        <p class=" mb-0 ms-2">${minute}:${seconds} </p>
        </div>
        </div>
        `;
        row.appendChild(col1);
        row.appendChild(col11);
        songs.appendChild(row);
      }
      search.appendChild(songs);
    })
    .catch((err) => console.log(err));
};

form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", () => {
  fetchGenre(url + "132");
  fetchGenre(url + "116");
  fetchGenre(url + "122");
  fetchGenre(url + "152");
  fetchGenre(url + "113");
  fetchGenre(url + "165");
  fetchGenre(url + "85");
  fetchGenre(url + "106");
  fetchGenre(url + "144");
  fetchGenre(url + "129");
  fetchGenre(url + "84");
  fetchGenre(url + "67");
  fetchGenre(url + "98");
  fetchGenre(url + "173");
  fetchGenre(url + "464");
  fetchGenre(url + "169");
  fetchGenre(url + "95");
  fetchGenre(url + "153");
  fetchGenre(url + "71");
  fetchGenre(url + "2");
  fetchGenre(url + "16");
  fetchGenre(url + "75");
  fetchGenre(url + "81");
  fetchGenre(url + "197");
});
