const searchInput = document.getElementById("search");
const results = document.getElementById("results");

let countries;
let searchTerm = "";

const WorldCountries = async () => {
  countries = await fetch("https://restcountries.com/v2/all").then((res) =>
    res.json()
  );
  console.log(countries);
};

const showCountries = async () => {
  await WorldCountries();
  results.innerHTML = countries
    .filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((country) => {
      return `<li class="country-item">
          <img class="country-flag" src="${country.flag}">
          <h3 class="country-name" >${country.name}</h3>
          <div class="country-info">
          <h2 class="country-population">${numberWithSpace(
            country.population
          )}</h2>
          <h5 class="country-population-text">Habitants</h5>
          </div>
          </li>
        
          `;
    })
    .join("");
};
showCountries();

function numberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  searchTerm = e.target.value;
  showCountries();
});
