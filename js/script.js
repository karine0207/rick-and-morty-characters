const currentPage = 1;
const characterList = document.getElementById("character-list");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

function loadCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      characterList.innerHTML = '';

      data.results.forEach(character => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="card">
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Name:</strong> ${character.name}</p>
            <p><strong>Species:</strong> ${character.species}</p>
          </div>
        `;
        characterList.appendChild(li);
      });


      prevButton.disabled = !data.info.prev;
      nextButton.disabled = !data.info.next;
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
      characterList.innerHTML = `<p>Error al cargar personajes. Intenta nuevamente.</p>`;
    });
}


prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});


loadCharacters(currentPage);


