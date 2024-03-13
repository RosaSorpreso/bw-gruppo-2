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


    let nomeaCazzo = createClone()
    let selectedSong = nomeaCazzo.getElementById('selected-song')
    let fileAudio = document.querySelector('#file-audio');

    let isAudioReady = false

    selectedSong.addEventListener('click', function(){
        let url = new URLSearchParams(location.search);
        let id = url.get('id');
        
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${id}`, {
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(res => res.json())
        .then(track => {
            let imgBar = document.querySelector('#img-bar')
            let titleBar = document.querySelector('#title-bar')
            let authorBar = document.querySelector('#author-bar')
            
            fileAudio.src = track.preview;
            imgBar.src = track.album.cover_small
            titleBar.innerText = track.title
            authorBar.innerText = track.artist.name

            isAudioReady = true
        });
    })
    
    let playIcon = document.querySelector('#play-icon');
    let progressBar = document.querySelector('#myBar');
    let currentDuration = document.querySelector('.current-duration');
    
    function playSong() {
        playIcon.classList.add('bi-pause-circle-fill');
        playIcon.classList.remove('bi-play-circle-fill');
        if(isAudioReady && fileAudio.paused){
            fileAudio.play();
        }
    }
    
    function pauseSong() {
        playIcon.classList.remove('bi-pause-circle-fill');
        playIcon.classList.add('bi-play-circle-fill');
        if(isAudioReady && !fileAudio.paused){
            fileAudio.pause();
        }
    } 
    
    playIcon.addEventListener('click', () => {
        const songProd = playIcon.classList.contains('bi-play-circle-fill');
        if (songProd) { 
            playSong(); 
        } else {
            pauseSong();
        }
    });
    
    function aggiornamento() {
        currentDuration.innerText = formatTime(Math.floor(fileAudio.currentTime));
    }
    
    setInterval(aggiornamento, 1000);
    
    fileAudio.ontimeupdate = function () {
        progressBar.style.width = Math.floor(fileAudio.currentTime * 100 / fileAudio.duration) + "%";
    }
    
    progressBar.addEventListener('click', (e) => {
        fileAudio.currentTime = ((e.offsetX / progressBar.offsetWidth) * fileAudio.duration);
    });
    
    function formatTime(e) {
        let minutes = 0;
        let seconds = 0;
        
        for (let i = 0; i < e; i++) {
            seconds++; 
            if (seconds >= 60) {
                minutes++; 
                seconds = 0;
            }
        } 
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
    

function createClone (){
    let template = document.querySelector('#song')
    let clone = template.content.cloneNode(true)
    return clone;
}