// ===============================
// PROJECT NEXUS - Single File Version
// ===============================

// ====== GLOBAL STATE ======
const State = {
  coins: [],
  filteredCoins: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  theme: localStorage.getItem("theme") || "light",
};

// ====== DOM ELEMENTS ======
const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const themeToggle = document.getElementById("themeToggle");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

// ====== API FETCH ======
async function fetchCoins() {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// ====== INITIALIZATION ======
async function init() {
  applyTheme();
  showLoader(true);

  try {
    State.coins = await fetchCoins();
    State.filteredCoins = [...State.coins];
    renderCoins(State.filteredCoins);
  } catch (error) {
    showError("⚠ Failed to fetch data. Please try again.");
  } finally {
    showLoader(false);
  }
}

// ====== RENDER FUNCTION ======
function renderCoins(coins) {
  container.innerHTML = "";

  coins.forEach((coin) => {
    const isFavorite = State.favorites.includes(coin.id);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}" />
      <h3>${coin.name}</h3>
      <p>Price: $${coin.current_price}</p>
      <p>Market Cap: $${coin.market_cap}</p>
      <button class="favBtn" data-id="${coin.id}">
        ${isFavorite ? "★ Remove" : "☆ Favorite"}
      </button>
    `;

    container.appendChild(card);
  });
}

// ====== SEARCH ======
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  State.filteredCoins = State.coins.filter((coin) =>
    coin.name.toLowerCase().includes(value)
  );

  renderCoins(State.filteredCoins);
});

// ====== SORT ======
sortSelect.addEventListener("change", (e) => {
  const sortType = e.target.value;

  State.filteredCoins.sort((a, b) => {
    switch (sortType) {
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "market_cap_asc":
        return a.market_cap - b.market_cap;
      case "price_desc":
        return b.current_price - a.current_price;
      case "price_asc":
        return a.current_price - b.current_price;
      default:
        return 0;
    }
  });

  renderCoins(State.filteredCoins);
});

// ====== FAVORITES ======
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("favBtn")) {
    const id = e.target.dataset.id;

    if (State.favorites.includes(id)) {
      State.favorites = State.favorites.filter((fav) => fav !== id);
    } else {
      State.favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(State.favorites));
    renderCoins(State.filteredCoins);
  }
});

// ====== THEME TOGGLE ======
themeToggle.addEventListener("click", () => {
  State.theme = State.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", State.theme);
  applyTheme();
});

function applyTheme() {
  document.body.classList.toggle("dark", State.theme === "dark");
}

// ====== LOADER & ERROR ======
function showLoader(show) {
  loader.classList.toggle("hidden", !show);
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// ====== START APP ======
init();