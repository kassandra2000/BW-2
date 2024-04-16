//costanti
const playlistRow = document.querySelector(".playlist-row");
const albumRow = document.querySelector(".album");
let exist = 0;
const locationId= (id)=>{
  window.location.assign("../../album.html?id="+id)
}

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
      const song = data.tracks.data[0];
      console.log(song);
      
      if (exist === 0) {
        const albumCol4 = document.createElement("div");
        albumCol4.classList.add("col-4");
        albumCol4.innerHTML = `<img
        class="title-img"
        src= ${song.album.cover}
        alt="img"
      />`;

        const albumCol8 = document.createElement("div");
        albumCol8.classList.add("col-8", "mt-2");
        albumCol8.innerHTML = ` <h6>ALBUM</h6>
        <h1>${
            song.album.title
  
        }</h1>
        <p>${song.artist.name}</p>
        <p>Ascolta il  singolo di ${song.artist.name} </p>

        <button class="play">Play</button>
        <button class="save">Salva</button>
        <div class="point">...</div>`;

        albumRow.appendChild(albumCol4);
        albumRow.appendChild(albumCol8);
        exist=1
      }

   

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
    })
    .catch((err) => {
       console.log(err);
     });
};

window.onload = () => {
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/12");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/14");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/67");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1003");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/1004");
  album("https://deezerdevs-deezer.p.rapidapi.com/playlist/119");
};
