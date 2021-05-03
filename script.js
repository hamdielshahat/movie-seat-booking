// const movie = document.getElementById("movie");
// const showCase = document.getElementById("showcase");
// const container = document.querySelector(".container");
// const screen = document.querySelector(".screen");
// const seats = document.querySelector(".row .seat");
// let priceText = document.querySelector("#price");
// let price = +document.querySelector("#price").value;
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
let total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

getUi();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function getUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  movieSelect.selectedIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    // WORKS fine
    // for (let i = 0; i < selectedSeats.length; i++) {
    //   seats[selectedSeats[i]].classList.add("selected");
    // }

    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); /////////////////////////////////// important

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex)); /////////////////////////////////////// important

  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = ticketPrice * selectedCount;
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

updateSelectedCount();
