//selezioniamo i template
let templateHome = document.getElementsByTagName('template')[0]
let cloneHome = templateHome.content.cloneNode(true);
let templateArtist = document.getElementsByTagName('template')[1]
let cloneArtist = templateArtist.content.cloneNode(true);
let templateAlbum = document.getElementsByTagName('template')[2]
let cloneAlbum = templateAlbum.content.cloneNode(true);
document.getElementById('templates-field').append(cloneHome.cloneNode(true))
setTimeout(iterateLoader, 1000)

//creiamo clone del template
function createClone (tag){
    let template = document.querySelector(tag)
    let clone = template.content.cloneNode(true)
    return clone;
}

//riempie la homepage
const fillAlbum = idAlbum => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`, {
        headers:{
            'Content-type':'application/json'
        }
    }).then(res => res.json())
    .then(album => {
        // console.log(album)
        let card = createClone('#card-album')
        
        let img = card.querySelector('.card-img-top')
        let title = card.querySelector('.card-title')
        let artist = card.querySelector('.card-text')
        
        img.src = album.cover_big
        title.innerText = album.title
        artist.innerText = album.artist.name
        title.albumId = idAlbum
        artist.artistId = album.artist.id
        
        document.querySelector('.row-albums').append(card)
    })
}

function fillAllAlbums (){
    fillAlbum(75631032);
    fillAlbum(75631012);
    fillAlbum(75621062);
    fillAlbum(1335314);
    fillAlbum(75622062);
    fillAlbum(925108);
    fillAlbum(75625062);
    fillAlbum(76635062);
    fillAlbum(75635062);
    fillAlbum(214959662);
}

fillAllAlbums();

//appende la homepage
function appendHome (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneHome.cloneNode(true))
    fillAllAlbums()
    setTimeout(iterateLoader, 1000)
}


//variabili e funzioni del mediaplayer
let song = document.querySelector('#file-audio');
let playIcon = document.querySelector('#play-icon');
let progressBar = document.querySelector('#myBar');
let bar = document.querySelector('#myProgress')
let currentDuration = document.querySelector('.current-duration');
let volume = document.querySelector('.volume-bar')
//variabii del footer
let imgBar = document.querySelector('#img-bar')
let titleBar = document.querySelector('#title-bar')
let authorBar = document.querySelector('#author-bar')

volume.addEventListener("input", e => {
    song.volume = e.currentTarget.value / 100;
})

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

bar.addEventListener('click', (e) => {
    song.currentTime = (e.offsetX / bar.offsetWidth) * song.duration;
})

let restartIcon = document.querySelector('.bi-skip-start-fill');
let skipNextIcon = document.querySelector('.bi-skip-end-fill');

restartIcon.addEventListener('click', () => {
    song.currentTime = 0;
    playSong();
});

//funzione per impostare la durata di album/canzone in minuti e secondi
function createDuration (duration){
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result;
}

//riempie la pagina album
function generateAlbum (albumId){
    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
        headers:{
            'Content-type':'application/json'
        }
    }).then(res => res.json())
    .then(album => {
        let coverAlbum = document.querySelector('#cover-album')
        let type = document.querySelector('.type')
        let title = document.querySelector('.album-title')
        let imgArtist = document.querySelector('#artist-thumbnail')
        let artistName = document.querySelector('#artist-name')
        let year = document.querySelector('#album-year')
        let totalSongs = document.querySelector('#songs-amount')
        let totalTime = document.querySelector('#total-time')
        
        coverAlbum.src = album.cover_medium
        type.innerText = album.record_type
        title.innerText = album.title
        imgArtist.src = album.artist.picture
        artistName.innerText = album.artist.name
        year.innerText = album.release_date
        totalSongs.innerText = album.nb_tracks + ' brani,'
        totalTime.innerText = createDuration(album.duration)
        
        //ciclo per inserire ogni canzone
        for (i = 0; i < album.tracks.data.length; i++) {
            let track = createClone('#song')
            
            let number = track.querySelector('.number')
            let songTitle = track.querySelector('.song-title')
            let songArtist = track.querySelector('.song-artist')
            let streaming = track.querySelector('.streaming')
            let songDuration = track.querySelector('.song-duration')
            let totalDuration = document.querySelector('.total-duration')
            
            let appendSong = album.tracks.data[i]
            number.innerText = i+1
            songTitle.innerText = appendSong.title
            songArtist.innerText = appendSong.artist.name
            streaming.innerText = appendSong.rank
            songDuration.innerText = createDuration(appendSong.duration)
            
            songTitle.addEventListener('click', () => {
                titleBar.innerText = appendSong.title
                imgBar.src = album.cover_small
                authorBar.innerText = album.artist.name
                totalDuration.innerText = createDuration(appendSong.duration)
                song.src = appendSong.preview
                playSong()
            })
            
            document.querySelector('.target').append(track)
        }
        
    })
    
}

//appende la pagina dell'album
function appendAlbum (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneAlbum.cloneNode(true))
    setTimeout(iterateLoader, 1000)
}

//appende la pagina artista
function appendArtist (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneArtist.cloneNode(true))
    setTimeout(iterateLoader, 1000)
}

//funzione che assegna evento click ai collegamenti dei template
function iterateLoader () {
    for (let i = 0; i < document.getElementsByClassName('loadArtist').length; i++) {
        document.getElementsByClassName('loadArtist')[i].addEventListener('click', appendArtist);
    }
    
    for (let i = 0; i < document.getElementsByClassName('loadHome').length; i++) {
        document.getElementsByClassName('loadHome')[i].addEventListener('click', appendHome);
    }
    
    console.log(document.getElementsByClassName('loadAlbum'));
    for (let i = 0; i < document.getElementsByClassName('loadAlbum').length; i++) {
        let id = document.getElementsByClassName('loadAlbum')[i].albumId;
        document.getElementsByClassName('loadAlbum')[i].addEventListener('click', function() {
            generateAlbum(id)
        });
        document.getElementsByClassName('loadAlbum')[i].addEventListener('click', appendAlbum);
    }
}