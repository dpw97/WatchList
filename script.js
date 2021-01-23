const API_KEY = "e8a71e93ce4fe2b8785d342be615a1ec";
let myWatchList = [];

async function getMovieDetails (title) {
    //fetch initial movie id
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`)
    let movieObject = await response.json();
    
    //use id to obtain a movie object & add it to my global watch list
    let movieId = movieObject.results[0].id;
    myWatchList.push(movieId);

    const details = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    let movieDetails = await details.json();
    
    addMovieCard(movieDetails);
}
async function getMovieById (id)
{
    const details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    let movieDetails = await details.json();
    return movieDetails;
}
function addMovieCard (movieDetails) {
    const watchList = document.getElementById("watchList")
    const movieTitle = document.createElement("div");
    const audienceRating = document.createElement("div");
    const movieImage = document.createElement("div");
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie";
    
    //poster_path is .jpg extension of the passed movie poster
    const imageUrl = "https://image.tmdb.org/t/p/w300" + movieDetails.poster_path;

    movieImage.style.backgroundImage = "url('" + imageUrl + "')"; 
    movieImage.className = "movieImage";
    movieDiv.appendChild(movieImage);
    
    movieTitle.textContent = movieDetails.original_title
    movieDiv.appendChild(movieTitle);
    
    audienceRating.textContent = "Audience Rating: " + movieDetails.vote_average;
    movieDiv.appendChild(audienceRating);

    watchList.append(movieDiv);
    saveLocalStorage();
    
}
function saveLocalStorage() {
    localStorage.setItem("myWatchList", JSON.stringify(myWatchList));
    
}

function loadLocalStorage() {
    myWatchList = JSON.parse(localStorage.getItem("myWatchList"));
    
    if(myWatchList === null)
    {
        myWatchList = [];
    }
    return myWatchList;
    
}
async function display () {
    if(myWatchList.length > 0) {
        for(let i = 0; i < myWatchList.length; i++) {
            
            let movieObj = await getMovieById(myWatchList[i])
            addMovieCard(movieObj);
        }
    }
}
function clearStorage () {
    localStorage.clear();
}

const button = document.getElementById("btn");
button.onclick = () => {
    let userInput = document.getElementById('userInput').value;
    getMovieDetails(userInput);
}
loadLocalStorage();
display();
