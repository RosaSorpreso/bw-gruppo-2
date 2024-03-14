

let song = document.querySelector('#file-audio');
let playIcon = document.querySelector('#play-icon');
let progressed = document.querySelector('#myProgress');
let progressBar = document.querySelector('#myBar');
let currentDuration = document.querySelector('.current-duration');

//PROGRESS BAR// 

song.ontimeupdate = function () {
    progressed.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%"
}
progressBar.addEventListener('click', (e) => {
    song.currentTime = ((e.offsetX / progressBar.offsetWidth) * song.duration)
});

//AGGIORNAMENTO TEMPO// 

let seconds = 0;
let mimutes = 0;
function formatTime(e) {
    let minutes = 0; let seconds = 0;

    for (let i = 0; i < e; i++) {
        seconds++; if (seconds >= 60) {
            minutes++; seconds = 0;
        }
    } return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
} function aggiornamento() {
    currentDuration.innerText = formatTime(Math.floor(song.currentTime));
} setInterval(aggiornamento, 1000);

//PLAY/PAUSE// 

function playSong() {
    playIcon.classList.add('bi-pause-circle-fill')
    playIcon.classList.remove('bi-play-circle-fill')
    song.play()
}
function pauseSong() {
    playIcon.classList.remove('bi-pause-circle-fill')
    playIcon.classList.add('bi-play-circle-fill')
    song.pause()
} 

playIcon.addEventListener('click', () => {
    const songProd = playIcon.classList.contains('bi-play-circle-fill') 
    if (songProd) { playSong() } else {
        pauseSong()
    }
})