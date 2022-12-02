const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const music = document.querySelector('audio')

const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight Disco Queen',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row(Remix)',
    artist: 'Metric/Jacinto Design'
  }
]

// Check if playing
let isPlaying = false

// Play Song
function playSong () {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

// Pause Song
function pauseSong () {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
function loadSong (song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`

  isPlaying ? playSong() : pauseSong()
}

// Current Song
let songIndex = 0

// Previous Song
function prevSong () {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])
}

// Next Song
function nextSong () {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Update Progress Bar and Time
function updateProgressBar (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    // Calculate duration (In minutes & Seconds)
    const durationInMinutes = Math.floor(duration / 60)
    let durationInSeconds = Math.floor(duration % 60)

    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`
    }

    // Delay switching duration element to avoid NaN
    if (durationInSeconds) {
      durationEl.textContent = `${durationInMinutes}:${durationInSeconds}`
    }
    // Calculate Current Time (In minutes & Seconds)
    const currentInMinutes = Math.floor(currentTime / 60)
    let currentInSeconds = Math.floor(currentTime % 60)

    if (currentInSeconds < 10) {
      currentInSeconds = `0${currentInSeconds}`
    }

    currentTimeEl.textContent = `${currentInMinutes}:${currentInSeconds}`
  }
}

// Set progress Bar
function setProgressBar (e) {
  const width = this.clientWidth
  const clickX = e.offsetX

  const { duration } = music // IMPORTANT
  music.currentTime = (clickX / width) * duration
}

// Previous and Next Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time Update Event Listener
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)

// Progress Bar click Event Listener
progressContainer.addEventListener('click', setProgressBar)
