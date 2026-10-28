const toggleButton = document.querySelector(".details-toggle");
const details = document.querySelector("#extra-details");

toggleButton.addEventListener("click", () => {
  const isHidden = details.classList.toggle("is-hidden");
  toggleButton.textContent = isHidden ? "Показати більше" : "Приховати";
  toggleButton.setAttribute("aria-expanded", String(!isHidden));
});

const favoriteButton = document.querySelector(".favorite-button");
const favoriteCard = favoriteButton.closest(".card");

favoriteButton.addEventListener("click", () => {
  const isActive = favoriteButton.classList.toggle("is-active");
  favoriteCard.classList.toggle("is-active", isActive);
  favoriteButton.textContent = isActive ? "В обраному" : "Додати в обране";
  favoriteButton.setAttribute("aria-pressed", String(isActive));
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
