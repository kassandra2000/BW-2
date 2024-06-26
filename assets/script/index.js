//costanti
const playlistArray = [];
const playlistRow = document.querySelector(".playlist-row");
const playlistList = document.querySelector(".playlist-list");
let playlistCounter = 0;
const albumRow = document.querySelector(".album");
let exist = 0;
const arrId = [
  "12",
  "1083",
  "1088",
  "1094",
  "1095",
  "1097",
  "1108",
  "1120",
  "1125",
  "1130",
  "1211",
  "1230",
  "1298",
  "1310",
  "1134",
  "1138",
  "1139",
  "1202",
  "1165",
  "1177",
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
const PlaylistAllArrayPush = (data) => {
  playlistArray.push({
    id: data.id,
    title: data.title,
  });
};
const album = (url) => {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ee479080e1msh75d5fd4295dec8ap18b484jsnc600f214b6d8",
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
        div.classList.add("ps-1", "col-6",  "col-lg-4");

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
      PlaylistAllArrayPush(data);
      if (playlistArray.length === 20) {
        sessionStorage.setItem("playlistArray", JSON.stringify(playlistArray));
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
  mediaPlayer();
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/12"); //15 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1083"); //35 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1088"); //31 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1094"); //17 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1095"); //102 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1097"); //21 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1108"); //101 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1120"); //25 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1125"); //16 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1130"); //21 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1211"); //27 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1230"); //30 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1298"); //76 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1310"); //17 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1134"); //21 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1138"); //14 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1139"); //14 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1202"); //15 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1165"); //22 canzoni
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1177"); //17 canzoni
};
