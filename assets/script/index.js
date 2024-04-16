//costanti
const playlistRow = document.querySelector(".playlist-row");
const playlistList = document.querySelector(".playlist-list");
let playlistCounter = 0;
const albumRow = document.querySelector(".album");
let exist = 0;
const arrId = [
  "12",
  "13",
  "14",
  "23",
  "24",
  "25",
  "28",
  "31",
  "36",
  "37",

  "40",
  "45",
  "47",
  "50",
  "52",
  "54",
  "58",
  "59",
  "60",
];

const random = (window.onload = () => {
  return Math.floor(Math.random() * 20);
});

console.log(arrId.length);

console.log(random());
console.log(random());
console.log(random());
console.log(random());

const locationId = (id) => {
  window.location.assign("../../album.html?id=" + id);
};
const album = (url) => {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "986451c613msh2cd80f663430ebbp123103jsnaf6225d65948",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        throw new Error(Response.statusText);
      }
    })
    .then((data) => {
      //   console.log(data);
      const song = data.tracks.data[Math.floor(Math.random() * 7)];
      console.log(song);
      //aggiunge i titoli delle playlist nella colonna di sinistra
      const playlistTitle = document.createElement("a");
      playlistTitle.setAttribute("href", "#");
      playlistTitle.textContent = data.title;
      playlistTitle.addEventListener("click", () => {
        locationId(data.id);
      });

      playlistList.appendChild(playlistTitle);

      if (exist === 0) {
        const albumCol4 = document.createElement("div");
        albumCol4.classList.add("col-4");
        albumCol4.innerHTML = `<img
        class="title-img"
        src= ${song.album.cover_big}
        alt="img"
      />`;

        const albumCol8 = document.createElement("div");
        albumCol8.classList.add("col-8", "mt-2");
        albumCol8.innerHTML = ` <h6>ALBUM</h6>
        <h1>${song.album.title}</h1>
        <p>${song.artist.name}</p>
        <p>Ascolta il  singolo di ${song.artist.name} </p>

        <button class="play">Play</button>
        <button class="save">Salva</button>
        <div class="point">...</div>`;

        albumRow.appendChild(albumCol4);
        albumRow.appendChild(albumCol8);
        exist = 1;
      }
      if (playlistCounter < 6) {
        const div = document.createElement("div");
        div.classList.add("ps-1", "col-4");

        div.innerHTML = `
        <div onclick="locationId(${data.id})" class="row flex col-bg g-1 img-container pointer">
          <div class="col-3">
            <img src=${data.picture} alt="" />
          </div>
          <div class="col-9">
            <p>${data.title}</p>
          </div>
        
      </div>`;
        playlistRow.appendChild(div);
        playlistCounter++;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrId[random()]);
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/121");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/122");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/123");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/127");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/126");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/128");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/129");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/130");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/131");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/12");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/14");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/13");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/50");
};
