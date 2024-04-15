const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/64932";
const url2 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=slash";
console.log(url2);

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
    document.getElementById(
      "hero"
    ).style.backgroundImage = `url(${picture_big})`;
  });
// .then((generateSongs) => {
//   const { title, duration } = generateSongs;

//   document.getElementById("cover").src = cover;
//   document.getElementById("title").innerText = title;
//   document.getElementById("duration").innerText = duration;
// });
