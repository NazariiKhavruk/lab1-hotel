const rooms = [
  {
    id: 1,
    title: "Standard",
    category: "standard",
    description: "1-2 особи, двоспальне ліжко, вікна у двір.",
    image: "images/room.avif"
  },
  {
    id: 2,
    title: "Standard Twin",
    category: "standard",
    description: "1-2 особи, два односпальні ліжка, робочий стіл.",
    image: "images/room.avif"
  },
  {
    id: 3,
    title: "Standard Accessible",
    category: "standard",
    description: "1-2 особи, номер для гостей з обмеженою мобільністю.",
    image: "images/room.avif"
  },
  {
    id: 4,
    title: "Deluxe",
    category: "deluxe",
    description: "2 особи, вид на місто.",
    image: "images/room.avif"
  },
  {
    id: 5,
    title: "Deluxe King",
    category: "deluxe",
    description: "2 особи, ліжко king-size, велика ванна кімната.",
    image: "images/room.avif"
  },
  {
    id: 6,
    title: "Deluxe з балконом",
    category: "deluxe",
    description: "2 особи, балкон з виглядом на центр Києва.",
    image: "images/room.avif"
  },
  {
    id: 7,
    title: "Executive Suite",
    category: "suite",
    description: "2-4 особи, окрема вітальня.",
    image: "images/room.avif"
  },
  {
    id: 8,
    title: "Family Suite",
    category: "suite",
    description: "До 4 осіб, дві спальні, міні-кухня.",
    image: "images/room.avif"
  }
];

const categoryLabels = {
  standard: "Standard",
  deluxe: "Deluxe",
  suite: "Suite"
};

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
