const url = "https://deezerdevs-deezer.p.rapidapi.com/genre/";

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
