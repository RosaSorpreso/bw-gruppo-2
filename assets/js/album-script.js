let url = new URLSearchParams(location.search)
let id = url.get('id')

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`, {
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
    // for (i = 0; i < album.tracks.data.length; i++) {
    //     let song = createClone()
        
    //     let number = song.querySelector('.number')
    //     let songTitle = song.querySelector('.song-title')
    //     let songArtist = song.querySelector('.song-artist')
    //     let streaming = song.querySelector('.streaming')
    //     let songDuration = song.querySelector('.song-duration')
    //     let playedSong = document.querySelector('#played-song')
        
    //     number.innerText = i+1
    //     songTitle.innerText = album.tracks.data[i].title
    //     songArtist.innerText = album.tracks.data[i].artist.name
    //     streaming.innerText = album.tracks.data[i].rank
    //     songArtist.href = `artist-page.html?id=${album.artist.id}`
    //     songDuration.innerText = createDuration(album.tracks.data[i].duration)
    //     let appendSong = album.tracks.data[i]

    //     songTitle.addEventListener('click', function(){
    //         playedSong.src = appendSong.preview
    //     })

    //     document.querySelector('.target').append(song)
    // }
    
})

function createClone (){
    let template = document.querySelector('#song')
    let clone = template.content.cloneNode(true)
    return clone;
}

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