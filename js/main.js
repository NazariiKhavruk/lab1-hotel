const toggleButton = document.querySelector(".details-toggle");
const details = document.querySelector("#extra-details");

toggleButton.addEventListener("click", () => {
  const isHidden = details.classList.toggle("is-hidden");
  toggleButton.textContent = isHidden ? "Показати більше" : "Приховати";
  toggleButton.setAttribute("aria-expanded", String(!isHidden));
});
