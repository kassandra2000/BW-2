const playlistArray = JSON.parse(sessionStorage.getItem("playlistArray"));
const playlistList = document.querySelector(".playlist-list");

if (playlistArray) {
  playlistArray.forEach((playlist) => {
    const playlistTitle = document.createElement("span");
    playlistTitle.textContent = playlist.title;
    playlistList.appendChild(playlistTitle);
  });
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);
const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id;
console.log(URL);
const url2 = " https://striveschool-api.herokuapp.com/api/deezer/artist/" + id + "/top?limit=5 ";
console.log(url2);
const songs = document.getElementById("songs");
const albums = document.getElementById("albums");
function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toLocaleString();
}

const artist = () => {
  fetch(URL, {
    headers: {
      "X-RapidAPI-Key": "ee479080e1msh75d5fd4295dec8ap18b484jsnc600f214b6d8",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      console.log(resp);
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((generateArtist) => {
      const { name, picture_big } = generateArtist;
      console.log(generateArtist);

      document.getElementById("name").innerText = name;
      document.getElementById("hero").style.backgroundImage = `url(${picture_big})`;
    })
    .catch((err) => console.log(err));
};

const album = () => {
  fetch(url2, {
    headers: {
      "X-RapidAPI-Key": "ee479080e1msh75d5fd4295dec8ap18b484jsnc600f214b6d8",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      console.log(resp);
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((elem) => {
      console.log(elem);
      const data = elem.data;
      for (let i = 0; i <= data.length; i++) {
        const cover = data[i].album.cover;
        const title = data[i].title;
        const dur = (data[i].duration / 60).toFixed(2);

        const div = document.createElement("div");
        const randomNumber = getRandomNumber(500000, 5000000);
        div.innerHTML = ` <div class="mt-2">
      
      <div class="songLine d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center py-2 gap-2">
      <button class="playBtn btn text-white"><svg
xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
fill="currentColor"
class="bi bi-play-fill"
viewBox="0 0 16 16"
>
<path
  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
/>
</svg>
</button>
        <img id="cover" src=${cover} alt="" />
        <h6 id="title">${title}</h6>
        </div>
        <div class="d-flex align-items-center gap-4">
        <button class="playBtn btn text-white"><svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
      </svg>
      </button>
        <p>${randomNumber}</p>
        <p id="duration">${dur}</p>
        <button class="playBtn btn">
        <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                    />
                  </svg>
                </button>
        </div>
      </div>
    </div>
  </div>
</div> `;
        songs.appendChild(div);

        const albumTitle = data[i].album.title;
        const divAblum = document.createElement("div");

        divAblum.innerHTML = `<div class="albumCards ">
        <div class="selAlbum position-relative p-1 gap-1">
<img src=${cover} class="albumImg" alt="...">
<button class="alBtn btn rounded-circle "><svg
xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
fill="currentColor"
class="bi bi-play-fill"
viewBox="0 0 16 16"
>
<path
  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
/>
</svg>
</button>
</div>
<div class= "albumTitle">
  <p class="pt-2">${albumTitle}</p>
  </div>
</div> `;
        albums.appendChild(divAblum);
      }
    })
    .catch((err) => console.log(err));
};

window.onload = () => {
  artist();
  album();
};
