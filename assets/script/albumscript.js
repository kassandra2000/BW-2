//costanti
const divArtist = document.querySelector(".artist");
const divTrack = document.querySelector(".track");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id;

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

      const parseMinute = minute[1].substring(0, 2);

      console.log(data);
      const div = document.createElement("div");
      div.classList.add("shadow-lg");
      div.innerHTML = `<img
      src=${data.picture}
      alt="album cover"
      width="200px"
    />`;

      const div1 = document.createElement("div");
      div1.classList.add("ps-3");
      div1.innerHTML = `<span class="fw-bold">ALBUM</span>
<h1 class="display-2 fw-bold">${data.title}</h1>
<p class="m-0">
  <img
    src="./assets/imgs/search/image-1.jpeg"
    width="20px"
    class="rounded-circle"
    alt=""
  />
  ${data.creator.name} • 2017 • ${data.tracks.data.length} brani,
  <span class="graytext">${minute[0]} min ${parseMinute} sec.</span>
</p>`;

      for (let i = 0; i < data.tracks.data.length; i++) {
        const trackMinute = data.tracks.data[i].duration / 60;
        let newTrackMinute = trackMinute.toString().split(".");

        if (trackMinute[1] == undefined) {
        } else if (newTrackMinute[1].length > 2) {
          newTrackMinute = newTrackMinute[1].substring(0, 2);
          console.log("newTrackMinute");
          
        } else {
          newTrackMinute = trackMinute.toString().split(".");
        }

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
      <span>694.000</span>
    </div>
    <div class="col col-4 align-content-center text-end">
      <span>4:00</span>
    </div>`;

        divTrack.appendChild(divInternalTrack);
      }
    })
    .catch((err) => console.log(err));
});
