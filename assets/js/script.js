let templateHome = document.getElementsByTagName('template')[0]
let cloneHome = templateHome.content.cloneNode(true);
let templateArtist = document.getElementsByTagName('template')[1]
let cloneArtist = templateArtist.content.cloneNode(true);
let templateAlbum = document.getElementsByTagName('template')[2]
let cloneAlbum = templateAlbum.content.cloneNode(true);
document.getElementById('templates-field').append(cloneHome.cloneNode(true))

function appendArtist (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneArtist.cloneNode(true))
    iterateLoader()
}

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
            let song = createClone()
            
            let number = song.querySelector('.number')
            let songTitle = song.querySelector('.song-title')
            let songArtist = song.querySelector('.song-artist')
            let streaming = song.querySelector('.streaming')
            let songDuration = song.querySelector('.song-duration')
            let playedSong = document.querySelector('#played-song')
            
            number.innerText = i+1
            songTitle.innerText = album.tracks.data[i].title
            songArtist.innerText = album.tracks.data[i].artist.name
            streaming.innerText = album.tracks.data[i].rank
            songArtist.href = `artist-page.html?id=${album.artist.id}`
            songDuration.innerText = createDuration(album.tracks.data[i].duration)
            let appendSong = album.tracks.data[i]

            songTitle.addEventListener('click', function(){
                playedSong.src = appendSong.preview
            })

            document.querySelector('.target').append(song)
        }
        
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
}

function appendAlbum (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneAlbum.cloneNode(true))
    iterateLoader()
}

function appendHome (){
    let actualChild = document.getElementById('templates-field').getElementsByTagName('div')[0]
    document.getElementById('templates-field').removeChild(actualChild)
    document.getElementById('templates-field').append(cloneHome.cloneNode(true))
    fillAllAlbums()
    iterateLoader()
}

function iterateLoader () {
    for (let i = 0; i < document.getElementsByClassName('loadArtist').length; i++) {
        document.getElementsByClassName('loadArtist')[i].addEventListener('click', appendArtist);
    }
    
    for (let i = 0; i < document.getElementsByClassName('loadHome').length; i++) {
        document.getElementsByClassName('loadHome')[i].addEventListener('click', appendHome);
    }
    
    for (let i = 0; i < document.getElementsByClassName('loadAlbum').length; i++) {
        let id = document.getElementsByClassName('loadAlbum')[i].albumId;
        document.getElementsByClassName('loadAlbum')[i].addEventListener('click', function() {
            generateAlbum(id)
        });
        document.getElementsByClassName('loadAlbum')[i].addEventListener('click', appendAlbum);
    }
}

iterateLoader()

function createClone (){
    let template = document.querySelector('#card-album')
    let clone = template.content.cloneNode(true)
    iterateLoader()
    return clone;
}

const fillAlbum = idAlbum => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`, {
    headers:{
        'Content-type':'application/json'
    }
}).then(res => res.json())
.then(album => {
    // console.log(album)
        let card = createClone()

        let img = card.querySelector('.card-img-top')
        let title = card.querySelector('.card-title')
        let artist = card.querySelector('.card-text')

        img.src = album.cover_big
        title.innerText = album.title
        artist.innerText = album.artist.name
        title.albumId = idAlbum
        // artist.href = `artist-page.html?id=${album.artist.id}`

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

fillAllAlbums ()