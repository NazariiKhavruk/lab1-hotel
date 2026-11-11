import { loadItems } from "./api.js";
import { filterItems, renderItems, setupFavorites, sortItems } from "./catalog.js";
import { debounce } from "./utils.js";
import { initUserItems } from "./userItems.js";

const searchInput = document.querySelector("#room-search");
const categorySelect = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const grid = document.querySelector("#room-grid");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");
const statusMessage = document.querySelector("#load-status");
const errorMessage = document.querySelector("#load-error");
const retryButton = document.querySelector("#retry-load");

let items = [];

function updateView() {
  const filteredItems = filterItems(items, searchInput.value, categorySelect.value);
  renderItems(sortItems(filteredItems, sortSelect.value), grid, resultsCount, emptyMessage);
}

async function init() {
  searchInput.disabled = true;
  categorySelect.disabled = true;
  sortSelect.disabled = true;
  retryButton.disabled = true;
  retryButton.hidden = true;
  errorMessage.hidden = true;
  statusMessage.textContent = "Завантаження…";
  grid.setAttribute("aria-busy", "true");
  grid.replaceChildren();
  resultsCount.textContent = "";
  emptyMessage.hidden = true;

  let loaded = false;

  try {
    items = await loadItems();
    updateView();
    loaded = true;
  } catch (error) {
    items = [];
    errorMessage.textContent = "Не вдалося завантажити каталог. Спробуйте ще раз.";
    errorMessage.hidden = false;
    retryButton.hidden = false;
    console.error(error);
  } finally {
    statusMessage.textContent = "";
    grid.setAttribute("aria-busy", "false");
    searchInput.disabled = !loaded;
    categorySelect.disabled = !loaded;
    sortSelect.disabled = !loaded;
    retryButton.disabled = false;
  }
}

searchInput.addEventListener("input", debounce(updateView, 300));
categorySelect.addEventListener("change", updateView);
sortSelect.addEventListener("change", updateView);
retryButton.addEventListener("click", init);
setupFavorites(grid);
initUserItems();
init();

// Взаємодії з лабораторної №5

const toggleButton = document.querySelector(".details-toggle");
const details = document.querySelector("#extra-details");

toggleButton.addEventListener("click", () => {
  const isHidden = details.classList.toggle("is-hidden");
  toggleButton.textContent = isHidden ? "Показати більше" : "Приховати";
  toggleButton.setAttribute("aria-expanded", String(!isHidden));
});

const guestsInput = document.querySelector("#guests");
const guestsMinus = document.querySelector("#guests-minus");
const guestsPlus = document.querySelector("#guests-plus");
const minGuests = Number(guestsInput.min);
const maxGuests = Number(guestsInput.max);

function updateGuests(value) {
  const guests = Math.min(maxGuests, Math.max(minGuests, value));
  guestsInput.value = guests;
  guestsMinus.disabled = guests === minGuests;
  guestsPlus.disabled = guests === maxGuests;
}

guestsMinus.addEventListener("click", () => updateGuests(Number(guestsInput.value) - 1));
guestsPlus.addEventListener("click", () => updateGuests(Number(guestsInput.value) + 1));
guestsInput.addEventListener("input", () => updateGuests(Number(guestsInput.value) || minGuests));

updateGuests(Number(guestsInput.value));
