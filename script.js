const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (remix)",
    artist: "Metric/Jacinto Design",
  },
];

// check if playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  // access and change class
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(songs) {
  // textContent used as no reflow needed unlike innerText
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `./music/${songs.name}.mp3`;
  image.src = `./img/${songs.name}.jpg`;
}

// current song
let songIndex = 0;

// prev song
function prevSong() {
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// on load - select first song
loadSong(songs[songIndex]);

// update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    // unpack values from objects into discreet variables
    const { duration, currentTime } = e.srcElement;
    console.log(duration, currentTime);
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  if (isPlaying) {
    music.currentTime = (clickX / width) * duration;
  }
}
// event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
