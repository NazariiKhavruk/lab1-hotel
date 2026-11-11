import { readUserItems, writeUserItems } from "./storage.js";
import { userCategoryLabels } from "./utils.js";

function validateNote({ title, category, description }) {
  if (title.length < 3 || title.length > 80) {
    return { field: "title", text: "Назва має містити від 3 до 80 символів." };
  }

  if (!Object.hasOwn(userCategoryLabels, category)) {
    return { field: "category", text: "Оберіть категорію." };
  }

  if (description.length < 10 || description.length > 500) {
    return { field: "description", text: "Опис має містити від 10 до 500 символів." };
  }

  return null;
}

function createUserCard(item) {
  const card = document.createElement("article");
  card.className = "card user-card";
  card.dataset.id = item.id;

  const category = document.createElement("p");
  category.className = "card-category";
  category.textContent = userCategoryLabels[item.category];

  const title = document.createElement("h4");
  title.className = "card-title";
  title.textContent = item.title;

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = item.description;

  const deleteButton = document.createElement("button");
  deleteButton.className = "button delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Видалити";
  deleteButton.dataset.deleteId = item.id;
  deleteButton.setAttribute("aria-label", `Видалити нотатку «${item.title}»`);

  card.append(category, title, description, deleteButton);
  return card;
}

export function initUserItems() {
  const form = document.querySelector("#user-item-form");
  const list = document.querySelector("#user-list");
  const message = document.querySelector("#user-message");
  const empty = document.querySelector("#user-empty");

  function showMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  }

  let userItems;

  try {
    userItems = readUserItems();
  } catch (error) {
    userItems = [];
    showMessage("Не вдалося відновити записи. Список почато в пам’яті.", true);
    console.error(error);
  }

  function renderUserItems() {
    const fragment = document.createDocumentFragment();
    userItems.forEach((item) => fragment.append(createUserCard(item)));

    list.replaceChildren(fragment);
    empty.hidden = userItems.length !== 0;
  }

  function commit(nextItems) {
    userItems = nextItems;
    renderUserItems();

    try {
      writeUserItems(userItems);
      return true;
    } catch (error) {
      showMessage("Зміни є в пам’яті, але не збережені після закриття сторінки.", true);
      console.error(error);
      return false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const record = {
      id: `user-${crypto.randomUUID()}`,
      title: String(data.get("title") ?? "").trim(),
      category: String(data.get("category") ?? ""),
      description: String(data.get("description") ?? "").trim()
    };

    const error = validateNote(record);
    if (error) {
      showMessage(error.text, true);
      form.elements.namedItem(error.field).focus();
      return;
    }

    const saved = commit([...userItems, record]);
    if (saved) {
      showMessage("Нотатку додано й збережено.");
    }

    form.reset();
    form.elements.namedItem("title").focus();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button || !list.contains(button)) {
      return;
    }

    const id = button.dataset.deleteId;
    const saved = commit(userItems.filter((item) => item.id !== id));
    if (saved) {
      showMessage("Нотатку видалено, зміни збережено.");
    }

    form.elements.namedItem("title").focus();
  });

  renderUserItems();
}
