const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');

// Playlist of songs
const playlist = [
  { src: 'song1.mp3', title: 'Song Title 1', artist: 'Artist 1' },
  { src: 'song2.mp3', title: 'Song Title 2', artist: 'Artist 2' },
  { src: 'song3.mp3', title: 'Song Title 3', artist: 'Artist 3' }
];
let idx = 0;

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

}

function loadSong(index) {
  audio.src = playlist[index].src;
  title.textContent = playlist[index].title;
  artist.textContent = playlist[index].artist;
  progress.value = 0;
  currentTime.textContent = "0:00";

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
  }, { once: true });

}

loadSong(idx);

// Play/Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playBtn.textContent = 'Play';
  }
});

// Next
nextBtn.addEventListener('click', () => {
  idx = (idx + 1) % playlist.length;
  loadSong(idx);
  audio.play();
  playBtn.textContent = 'Pause';
});

// Previous
prevBtn.addEventListener('click', () => {
  idx = (idx - 1 + playlist.length) % playlist.length;
  loadSong(idx);
  audio.play();
  playBtn.textContent = 'Pause';
});

// Update progress and current time
audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Seek when clicking progress
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Reset to Play when song ends
audio.addEventListener('ended', () => {
  playBtn.textContent = 'Play';
});