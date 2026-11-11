export const categoryLabels = {
  standard: "Standard",
  deluxe: "Deluxe",
  suite: "Suite"
};

export const userCategoryLabels = {
  room: "Номер",
  food: "Харчування",
  leisure: "Дозвілля"
};

export function debounce(fn, delay = 300) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
