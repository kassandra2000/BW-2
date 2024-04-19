const URL3 = "https://deezerdevs-deezer.p.rapidapi.com/track/2465337715";
const audio = document.getElementById("audio");
const titleAdd = document.getElementById("title");
const artistAdd = document.querySelector(".artist");
const previewAdd = document.getElementById("preview");
const playBtn = document.querySelector(".bi-play-circle-fill");
const img = document.getElementById("img");
let i = 3.33;
let time = 0;
const bar = document.querySelector(".progress");
console.log("");

const mediaPlayer = () => {
  fetch(URL3, {
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

      const cover = elem.album.cover;
      const title = elem.title;
      const artist = elem.artist.name;
      const preview = elem.preview;
      titleAdd.innerHTML = `${title}`;
      artistAdd.innerHTML = `${artist}`;
      img.src = `${cover}`;
      const audio = new Audio(preview);
      let interval = 0;
      playBtn.addEventListener("click", () => {
        if (interval === 0 || audio.paused) {
          interval = setInterval(() => {
            if (time < 99) {
              time += i;
              bar.style = `width:${time}%`;
              console.log(time);
            } else {
              clearInterval();
            }
          }, 1000);
        }

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          clearInterval(interval);
          console.log(interval);
          time += 3.33;
        }

        const volumeSlider = document.getElementById("volume-slider");
        volumeSlider.addEventListener("input", () => {
          console.log(audio.volume);
          audio.volume = volumeSlider.value;

          console.log(audio.volume);
          console.dir(audio);
        });
      });

      console.log(titleAdd);
    });
};
