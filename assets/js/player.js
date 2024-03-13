//Barra scorrimento duarata canzone
/*function updateProgress() {
    let progressBar = document.getElementById("myBar");
    let progressSpan = document.querySelector(".mediaplayer span");
    let currentTime = 0;
    let totalTime = 50;

    let progressInterval = setInterval(function() {
        currentTime++;
        let progressWidth = (currentTime / totalTime) * 100;
        progressBar.style.width = progressWidth + "%";
        progressSpan.textContent = currentTime;
        if (currentTime >= totalTime) {
            clearInterval(progressInterval);
        }
    }, 1000);
}

updateProgress();*/

let song = document.getElementById('song');
let playBtn = document.querySelector('.playBtn');
let playIcon = document.querySelector('#iconBtn');
let progressed = document.querySelector('#progressed');
let progressBar = document.querySelector('#progressBar');
let minutesInit = document.querySelector('.minutesInit');

//PROGRESS BAR// 

song.ontimeupdate = function () {
    progressed.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%"
}
progressBar.addEventListener('click', (e) => {
    song.currentTime = ((e.offsetX / progressBar.offsetWidth) * song.duration)
});

//AGGIORNAMENTO TEMPO// 

let s = 0;
let m = 0;
function diomerda(e) {
    let m = 0; let s = 0;

    for (let i = 0; i < e; i++) {
        s++; if (s >= 60) {
            m++; s = 0;
        }
    } return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
} function aggiornamento() {
    minutesInit.innerText = diomerda(Math.floor(song.currentTime));
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
} playBtn.addEventListener('click', () => {
    const songProd = playIcon.classList.contains('bi-play-circle-fill') 
    if (songProd) { playSong() } else {
        pauseSong()
    }
})