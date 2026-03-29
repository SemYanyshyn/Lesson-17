const div = document.querySelector(".container");
const planet = document.querySelector(".planets");
const btn = document.getElementById("planetBtn");
const spinner = document.getElementById("spinner");

function clearContainer() {
  planet.innerHTML = "";
}

function displaySpinner() {
  spinner.classList.remove("d-none");
}

function hideSpinner() {
  spinner.classList.add("d-none");
}

function disableBtn() {
  btn.disabled = true;
}

function enableBtn() {
  btn.disabled = false;
}

async function getPlanets() {
  clearContainer();
  disableBtn();
  displaySpinner();

  try {
    const dataFetch = await fetch("https://www.swapi.tech/api/planets/");
    const data = await dataFetch.json();
    const dataResult = data.results;

    for (let i = 0; i < dataResult.length; i++) {
      const namesOfPlanets = dataResult[i].name;
      const planetId = dataResult[i].uid;
      const p = document.createElement("p");
      p.append(namesOfPlanets);
      planet.append(p);
      p.id = planetId;
      p.classList.add("planet");
    }
  } catch (error) {
    planet.textContent = "Opps! No data found.";
  } finally {
    hideSpinner();
    enableBtn();
  }
}

btn.addEventListener("click", getPlanets);

const modalBody = document.getElementById("modalBody");
const modalContainer = document.getElementById("planetModal");

document.body.addEventListener("click", (event) => {
  const pushedElem = event.target.id;
  if (event.target.classList.contains("planet")) {
    async function getInfo() {
      const dataPlanet = await fetch(
        `https://swapi.tech/api/planets/${pushedElem}`,
      );
      const dataPlanetJson = await dataPlanet.json();
      console.log(dataPlanetJson);
      const props = dataPlanetJson.result.properties;
      modalBody.innerHTML = `<pre>${JSON.stringify(props, null, 2)}</pre>`;
      const modal = new bootstrap.Modal(modalContainer);
      //щоб відкрити Bootstrap modal, треба не просто HTML-елемент,
      // а Bootstrap-об’єкт модалки.
      modal.show();
    }
    getInfo();
  }
});
