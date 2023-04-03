// Define constants
const BASE_URL = 'http://localhost:3000';

// Function to fetch film data
function fetchFilmData(id) {
  return fetch(`${BASE_URL}/films/${id}`)
    .then(response => response.json())
    .catch(error => console.error(`Error fetching film data: ${error}`));
}

// Function to fetch all films
function fetchAllFilms() {
  return fetch(`${BASE_URL}/films`)
    .then(response => response.json())
    .catch(error => console.error(`Error fetching all films: ${error}`));
}

// Function to display film data
function displayFilmData(film) {
  const poster = document.querySelector('#poster');
  poster.src = film.poster;

  const title = document.querySelector('#title');
  title.textContent = film.title;

  const runtime = document.querySelector('#runtime');
  runtime.textContent = `${film.runtime} minutes`;

  const showtime = document.querySelector('#showtime');
  showtime.textContent = film.showtime;

  const availableTickets = document.querySelector('#available-tickets');
  const ticketsLeft = film.capacity - film.tickets_sold;
  availableTickets.textContent = `${ticketsLeft} tickets left`;

  const buyButton = document.querySelector('#buy-button');
  buyButton.disabled = (ticketsLeft === 0);

  buyButton.addEventListener('click', () => {
    if (ticketsLeft > 0) {
      availableTickets.textContent = `${--ticketsLeft} tickets left`;
      buyButton.disabled = (ticketsLeft === 0);
    }
  });
}

// Function to display all films
function displayAllFilms(films) {
  const filmsList = document.querySelector('#films');
  filmsList.innerHTML = '';

  for (let film of films) {
    const filmItem = document.createElement('li');
    filmItem.classList.add('film', 'item');
    filmItem.textContent = film.title;

    filmItem.addEventListener('click', () => {
      fetchFilmData(film.id)
        .then(displayFilmData)
        .catch(error => console.error(`Error fetching film data: ${error}`));
    });

    filmsList.appendChild(filmItem);
  }
}

// Main function
function main() {
  // Fetch all films and display them
  fetchAllFilms()
    .then(displayAllFilms)
    .catch(error => console.error(`Error fetching all films: ${error}`));

  // Fetch the first film and display its data
  fetchFilmData(1)
    .then(displayFilmData)
    .catch(error => console.error(`Error fetching film data: ${error}`));
}

// Call main function when page is loaded
document.addEventListener('DOMContentLoaded', main);

// Define an array with movie data
const movies = [
  {
    title: 'The Giant Gila Monster',
    description: 'A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.',
    imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg'
  },
  {
    title: 'Manos: The Hands Of Fate',
    description: 'A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.',
    imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg'
  },
  {
    title: 'Time Chasers',
    description: 'An inventor comes up with a time machine, but must prevent its abuse at the hands of an evil C.E.O.',
    imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/23342/p23342_v_v8_ab.jpg'
},
{
  title: 'The Touch Of Satan',
  description: 'A young man meets a farm girl who is actually a witch.',
  imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/43468/p43468_v_v8_aa.jpg'
},
{
  title: 'Santa Claus Conquers The Martians',
  description: 'The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.',
  imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/4232/p4232_v_v8_aa.jpg'
}
];

// Display the current movie in the carousel
function displayCurrentMovie() {
movieContainer.querySelector('img').src = movies[currentMovieIndex].imageUrl;
movieInfo.querySelector('h3').textContent = movies[currentMovieIndex].title;
movieInfo.querySelector('p').textContent = movies[currentMovieIndex].description;
}

// Update the index and display the next movie
function showNextMovie() {
currentMovieIndex = (currentMovieIndex + 1) % movies.length;
displayCurrentMovie();
}

// Add an event listener to the "Next" button
nextButton.addEventListener('click', showNextMovie);

// Display the initial movie
displayCurrentMovie();
