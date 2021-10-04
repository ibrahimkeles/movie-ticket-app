const containerEl = document.querySelector(".container");
const countEl = document.querySelector(".count");
const amountEl = document.querySelector(".amount");
const selectEl = document.querySelector("#movie");
const seatsEl = document.querySelectorAll(".container .row .seat:not(.reserved)");
getFromLocalStorage();
eventListeners();
moviPriceCalculator();
function eventListeners() {
    containerEl.addEventListener("click", function (e) {
        if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
            e.target.classList.toggle('selected');
            moviPriceCalculator();
        }
    });
    selectEl.addEventListener("change", function (e) {
        moviPriceCalculator();
    });
}
function moviPriceCalculator() {
    const selectedSeats = containerEl.querySelectorAll(".container .row .seat.selected");
    const selectedSeatArr = [];
    const seatArr = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatArr.push(seat);
    });
    seatsEl.forEach(function (seat) {
        seatArr.push(seat);
    });
    let selectedSeatIndexs = selectedSeatArr.map(function (seat) {
        return seatArr.indexOf(seat);
    });
    let selectedSeatCount = selectedSeats.length;
    countEl.innerHTML = selectedSeatCount;
    amountEl.innerHTML = selectedSeatCount * selectEl.value + " ₺";

    savetoLocalStorage(selectedSeatIndexs);
}
function savetoLocalStorage(indexs) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", selectEl.selectedIndex);
}
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seatsEl.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"));
    if (selectedMovieIndex != null) {
        selectEl.selectedIndex = selectedMovieIndex;
    }
}