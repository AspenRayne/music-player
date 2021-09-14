const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio  = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
// const volume = document.querySelector

// Song Title
const songs = ['dubstep', 'betterdays', 'onceagain']

// Keep track of songs
let songIndex = 2

// Initially load song info DOM
loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg` 
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])

    playSong()

}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0 
    }
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
// Event listeners
playBtn.addEventListener('click' , () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }   else {
        playSong()
    }
})

// Change song event
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

//Change Volume
document.addEventListener("DOMContentLoaded", () => {
    const range = document.querySelector(".volume input[type=range]");
  
    const barHoverBox = document.querySelector(".volume .bar-hoverbox");
    const fill = document.querySelector(".volume .bar .bar-fill");
    
    range.addEventListener("change", (e) => {
        audio.volume = e.target.value;
    //   console.log("value", e.target.value);
    });
});
    
