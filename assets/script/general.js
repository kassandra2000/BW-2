const URL3 = "https://deezerdevs-deezer.p.rapidapi.com/track/";
const audio = document.getElementById("audio");
const titleAdd = document.getElementById("title");
const artistAdd = document.querySelector(".artist");
const previewAdd = document.getElementById("preview");
const playBtn = document.getElementById("play");
const img = document.getElementById("img");
let audio1 = undefined;
let i = 3.33;
let time = 0;
let interval = 0;
const bar = document.querySelector(".progress");
console.log("");

const mediaPlayer = (id) => {
  const URLid = URL3 + id;
  fetch(URLid, {
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
      if (audio1 !== undefined) {
        if (!audio1.paused) {
          audio1.pause();

          interval = 0;
        }
      }

      const cover = elem.album.cover;
      const title = elem.title;
      const artist = elem.artist.name;
      const preview = elem.preview;
      titleAdd.innerHTML = `${title}`;
      artistAdd.innerHTML = `${artist}`;
      img.src = `${cover}`;
      audio1 = new Audio(preview);

      playBtn.addEventListener("click", () => {
        if (interval === 0 || audio1.paused) {
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

        if (audio1.paused) {
          audio1.play();
        } else {
          audio1.pause();
          clearInterval(interval);
          console.log(interval);
          time += 3.33;
        }

        const volumeSlider = document.getElementById("volume-slider");
        volumeSlider.addEventListener("input", () => {
          console.log(audio1.volume);
          audio1.volume = volumeSlider.value;

          console.log(audio1.volume);
          console.dir(audio1);
        });
      });

      console.log(titleAdd);
    })
    .catch((err) => {
      console.log(err);
    });
};
