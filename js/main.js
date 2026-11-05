import { loadItems } from "./api.js";
import { filterItems, renderItems, setupFavorites } from "./catalog.js";

const searchInput = document.querySelector("#room-search");
const categorySelect = document.querySelector("#category-filter");
const grid = document.querySelector("#room-grid");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");

let items = [];

function updateView() {
  const filteredItems = filterItems(items, searchInput.value, categorySelect.value);
  renderItems(filteredItems, grid, resultsCount, emptyMessage);
}

async function init() {
  items = await loadItems();
  updateView();
}

searchInput.addEventListener("input", updateView);
categorySelect.addEventListener("change", updateView);
setupFavorites(grid);
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
