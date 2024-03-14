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

// let song = document.querySelector('#file-audio');
// let playIcon = document.querySelector('#play-icon');
// let progressed = document.querySelector('#myProgress');
// let progressBar = document.querySelector('#myBar');
// let currentDuration = document.querySelector('.current-duration');

// //PROGRESS BAR// 

// song.ontimeupdate = function () {
//     progressed.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%"
// }
// progressBar.addEventListener('click', (e) => {
//     song.currentTime = ((e.offsetX / progressBar.offsetWidth) * song.duration)
// });

// //AGGIORNAMENTO TEMPO// 

// let seconds = 0;
// let mimutes = 0;
// function formatTime(e) {
//     let minutes = 0; let seconds = 0;

//     for (let i = 0; i < e; i++) {
//         seconds++; if (seconds >= 60) {
//             minutes++; seconds = 0;
//         }
//     } return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
// } function aggiornamento() {
//     currentDuration.innerText = formatTime(Math.floor(song.currentTime));
// } setInterval(aggiornamento, 1000);

// //PLAY/PAUSE// 

// function playSong() {
//     playIcon.classList.add('bi-pause-circle-fill')
//     playIcon.classList.remove('bi-play-circle-fill')
//     song.play()
// }
// function pauseSong() {
//     playIcon.classList.remove('bi-pause-circle-fill')
//     playIcon.classList.add('bi-play-circle-fill')
//     song.pause()
// } 

// playIcon.addEventListener('click', () => {
//     const songProd = playIcon.classList.contains('bi-play-circle-fill') 
//     if (songProd) { playSong() } else {
//         pauseSong()
//     }
// })

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

// let song = document.querySelector('#file-audio');
// let playIcon = document.querySelector('#play-icon');
// let progressed = document.querySelector('#myProgress');
// let progressBar = document.querySelector('#myBar');
// let currentDuration = document.querySelector('.current-duration');

// //PROGRESS BAR// 

// song.ontimeupdate = function () {
//     progressed.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%"
// }
// progressBar.addEventListener('click', (e) => {
//     song.currentTime = ((e.offsetX / progressBar.offsetWidth) * song.duration)
// });

// //AGGIORNAMENTO TEMPO// 

// let seconds = 0;
// let mimutes = 0;
// function formatTime(e) {
//     let minutes = 0; let seconds = 0;

//     for (let i = 0; i < e; i++) {
//         seconds++; if (seconds >= 60) {
//             minutes++; seconds = 0;
//         }
//     } return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
// } function aggiornamento() {
//     currentDuration.innerText = formatTime(Math.floor(song.currentTime));
// } setInterval(aggiornamento, 1000);

// //PLAY/PAUSE// 

// function playSong() {
//     playIcon.classList.add('bi-pause-circle-fill')
//     playIcon.classList.remove('bi-play-circle-fill')
//     song.play()
// }
// function pauseSong() {
//     playIcon.classList.remove('bi-pause-circle-fill')
//     playIcon.classList.add('bi-play-circle-fill')
//     song.pause()
// } 

// playIcon.addEventListener('click', () => {
//     const songProd = playIcon.classList.contains('bi-play-circle-fill') 
//     if (songProd) { playSong() } else {
//         pauseSong()
//     }
// })
document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(location.search);
    let albumId = urlParams.get('id');

    let song = document.querySelector('#file-audio');
    let playIcon = document.querySelector('#play-icon');
    let progressBar = document.querySelector('#myBar');
    let currentDuration = document.querySelector('.current-duration');

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(album => {
        let trackList = document.querySelector('.target');
        let imgBar = document.querySelector('#img-bar')
        let titleBar = document.querySelector('#title-bar')
        let authorBar = document.querySelector('#author-bar')

        album.tracks.data.forEach((track, index) => {
            let trackElement = document.importNode(document.getElementById('song').content, true);
            let title = trackElement.querySelector('.song-title');
            let artist = trackElement.querySelector('.song-artist');
            let number = trackElement.querySelector('.number');
            let streaming = trackElement.querySelector('.streaming');
            let songDuration = trackElement.querySelector('.song-duration');
            
            title.innerText = track.title;
            artist.innerText = track.artist.name;
            streaming.innerText = track.rank;
            songDuration.innerText = createDuration(track.duration)
            number.innerText = index + 1;

            title.addEventListener('click', () => {
                titleBar.innerText = track.title
                imgBar.src = album.cover_small
                authorBar.innerText = album.artist.name
                song.src = track.preview;
                playSong();
            });

            trackList.appendChild(trackElement);
        });
    });

    //funzione per impostare la durata di album/canzone in minuti e secondi
    function createDuration (duration){
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
        }
        const result = `${padTo2Digits(minutes)} min ${padTo2Digits(seconds)} sec`;
        return result;
    }

    function playSong() {
        playIcon.classList.add('bi-pause-circle-fill');
        playIcon.classList.remove('bi-play-circle-fill');
        song.play();
    }

    function pauseSong() {
        playIcon.classList.remove('bi-pause-circle-fill');
        playIcon.classList.add('bi-play-circle-fill');
        song.pause();
    } 

    playIcon.addEventListener('click', () => {
        if (playIcon.classList.contains('bi-play-circle-fill')) { 
            playSong(); 
        } else {
            pauseSong();
        }
    });

    function formatTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds % 60);
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    song.ontimeupdate = function () {
        let progressWidth = (song.currentTime / song.duration) * 100;
        progressBar.style.width = progressWidth + "%";
        currentDuration.innerText = formatTime(song.currentTime);
    }

    progressBar.addEventListener('click', (e) => {
        song.currentTime = (e.offsetX / progressBar.offsetWidth) * song.duration;
    });
});
