const priceInp = document.querySelector("#price");

const inputOnlyNumber = (e) => {
  if (isNaN(e.key) && e.key !== "Backspace") e.preventDefault();
};

priceInp.addEventListener("keydown", inputOnlyNumber);
