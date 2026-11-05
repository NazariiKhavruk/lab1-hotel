import { categoryLabels } from "./utils.js";

const favoriteIds = new Set();

export function filterItems(items, query, category) {
  const text = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesText = `${item.title} ${item.description}`.toLowerCase().includes(text);
    const matchesCategory = category === "all" || item.category === category;
    return matchesText && matchesCategory;
  });
}

const sortStrategies = {
  default: (a, b) => a.id - b.id,
  "title-asc": (a, b) => a.title.localeCompare(b.title, "uk"),
  "title-desc": (a, b) => b.title.localeCompare(a.title, "uk")
};

export function sortItems(items, strategy = "default") {
  const compare = sortStrategies[strategy] ?? sortStrategies.default;
  return [...items].sort(compare);
}

function setFavoriteState(card, button, isActive) {
  card.classList.toggle("is-active", isActive);
  button.classList.toggle("is-active", isActive);
  button.textContent = isActive ? "В обраному" : "Додати в обране";
  button.setAttribute("aria-pressed", String(isActive));
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = String(item.id);

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = item.image;
  image.alt = item.title;

  const category = document.createElement("p");
  category.className = "card-category";
  category.textContent = categoryLabels[item.category];

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.title;

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = item.description;

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "button favorite-button";
  favoriteButton.type = "button";
  setFavoriteState(card, favoriteButton, favoriteIds.has(item.id));

  card.append(image, category, title, description, favoriteButton);
  return card;
}

export function renderItems(items, grid, count, empty) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.append(createCard(item)));

  grid.replaceChildren(fragment);
  count.textContent = `Знайдено: ${items.length}`;
  empty.hidden = items.length !== 0;
}

export function setupFavorites(grid) {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-button");
    if (!button) {
      return;
    }

    const card = button.closest(".card");
    const id = Number(card.dataset.id);
    const isActive = !favoriteIds.has(id);

    if (isActive) {
      favoriteIds.add(id);
    } else {
      favoriteIds.delete(id);
    }

    setFavoriteState(card, button, isActive);
  });
}
