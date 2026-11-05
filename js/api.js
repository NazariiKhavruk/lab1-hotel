import { categoryLabels } from "./utils.js";

const textFields = ["title", "category", "description", "image"];
const imagePattern = /^images\/[\w-]+\.(jpg|jpeg|png|webp|avif)$/i;

function validateItems(items) {
  const ids = new Set();

  items.forEach((item, index) => {
    const position = `Запис ${index + 1}`;

    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error(`${position}: очікується об’єкт`);
    }

    if (!Number.isInteger(item.id) || item.id <= 0) {
      throw new Error(`${position}: id має бути додатним цілим числом`);
    }

    if (ids.has(item.id)) {
      throw new Error(`${position}: id ${item.id} повторюється`);
    }
    ids.add(item.id);

    textFields.forEach((field) => {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        throw new Error(`${position}: поле ${field} має бути непорожнім рядком`);
      }
    });

    if (!Object.hasOwn(categoryLabels, item.category)) {
      throw new Error(`${position}: невідома категорія ${item.category}`);
    }

    if (!imagePattern.test(item.image)) {
      throw new Error(`${position}: image має бути локальним шляхом до зображення`);
    }
  });
}

export async function loadItems() {
  const url = new URL("../data/items.json", import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Очікується масив об’єктів");
  }

  validateItems(data);
  return data;
}
