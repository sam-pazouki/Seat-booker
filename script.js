const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', movieIndex);
    }

// Update total and count
function updtaeSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row.seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seats));
      
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
    );

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');

            }
        });
        
    }


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');    

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updtaeSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if(
        e.target.classList.contains('seats') &&
        !e.target.classList.contains('occupied')
    ) {
     e.target.classList.toggle('selected');

      updtaeSelectedCount();
    }
    });

    // Initial count and total set
    updtaeSelectedCount();
