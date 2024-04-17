//costanti
const playlistArray = JSON.parse(sessionStorage.getItem("playlistArray"));
const playlistList = document.querySelector(".playlist-list");
const divArtist = document.querySelector(".artist");
const divTrack = document.querySelector(".track");
const centralCol = document.querySelector(".central-column");

if (playlistArray) {
  playlistArray.forEach((playlist) => {
    const playlistTitle = document.createElement("a");
    playlistTitle.setAttribute("href", "./album.html?id=" + playlist.id);
    playlistTitle.textContent = playlist.title;
    playlistList.appendChild(playlistTitle);
  });
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id;
//numero random per le riproduzioni
function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toLocaleString();
}

//avgcolor dell'immagine per lo sfondo della colonna centrale
function getAverageColor(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < imageData.data.length; i += 4) {
        r += imageData.data[i];
        g += imageData.data[i + 1];
        b += imageData.data[i + 2];
      }

      const pixelCount = imageData.data.length / 4;
      const avgR = Math.round(r / pixelCount);
      const avgG = Math.round(g / pixelCount);
      const avgB = Math.round(b / pixelCount);
      const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
      resolve(avgColor);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "986451c613msh2cd80f663430ebbp123103jsnaf6225d65948",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((data) => {
      const min = data.duration / 60;
      const minute = min.toString().split(".");
      const parseMinute = data.duration % 60;

      console.log(data);
      const div = document.createElement("div");
      div.classList.add("shadow-lg");
      div.innerHTML = `<img
      id="myImg"
      src=${data.picture_big}
      alt="album cover"
      width="200px"
    />`;

      const div1 = document.createElement("div");
      div1.classList.add("ps-3");
      div1.innerHTML = `<span class="fw-bold">PLAYLIST</span>
<h1 class="display-2 fw-bold">${data.title}</h1>
<p class="m-0">
  <img
    src="./assets/imgs/search/image-1.jpeg"
    width="20px"
    class="rounded-circle"
    alt=""
  />
  ${data.creator.name} • 2017 • ${data.tracks.data.length} brani,
  <span class="durationtext">${minute[0]} min ${parseMinute} sec.</span>
</p>`;
      divArtist.appendChild(div);
      divArtist.appendChild(div1);
      for (let i = 0; i < data.tracks.data.length; i++) {
        const artistID = data.tracks.data[i].artist.id;
        const trackMinute = data.tracks.data[i].duration / 60;
        let newTrackMinute = trackMinute.toString().split(".");
        let seconds = data.tracks.data[i].duration % 60;
        if (seconds.toString().length == 1) {
          seconds = seconds + "0";
        } else if (seconds.toString().length == 0) {
          seconds = seconds + "00";
        }
        const randomNumber = getRandomNumber(100000, 1500000);
        const divInternalTrack = document.createElement("div");
        divInternalTrack.classList.add("d-flex", "graytext", "pb-2");
        divInternalTrack.innerHTML = ` <div class="col col-1 align-content-center text-center">
      <span>${i + 1}</span>
    </div>
    <div class="col col-3">
      <span class="text-white">${data.tracks.data[i].title_short}</span><br />
      <span>${data.tracks.data[i].artist.name}</span>
    </div>
    <div class="col col-4 align-content-center text-end">
      <span>${randomNumber}</span>
    </div>
    <div class="col col-4 align-content-center text-end">
      <span>${newTrackMinute[0]}:${seconds}</span>
    </div>`;
        console.dir(divInternalTrack);
        const artist = divInternalTrack.children[1].children[2];
        artist.addEventListener("click", () => {
          window.location.href = "./artist.html?id=" + artistID;
        });
        divTrack.appendChild(divInternalTrack);
      }
      const imageUrl = data.picture_big;
      getAverageColor(imageUrl)
        .then((avgColor) => {
          const gradient = `linear-gradient(180deg, ${avgColor} 30%, rgba(10, 10, 10, 1) 40%`;
          centralCol.style.background = gradient;
        })
        .catch((error) => {
          console.error("Errore nel calcolo del colore medio:", error);
        });
    })
    .catch((err) => console.log(err));
});
