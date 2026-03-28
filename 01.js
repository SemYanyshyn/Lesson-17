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
      const p = document.createElement("p");
      p.append(namesOfPlanets);
      planet.append(p);
    }
  } catch (error) {
    planet.textContent = "Opps! No data found.";
  } finally {
    hideSpinner();
    enableBtn();
  }
}

btn.addEventListener("click", getPlanets);
