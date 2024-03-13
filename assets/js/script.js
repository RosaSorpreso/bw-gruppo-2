function createClone (){
    let template = document.querySelector('#card-album')
    let clone = template.content.cloneNode(true)
    return clone;
}

const fillAlbum = idAlbum => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`, {
    headers:{
        'Content-type':'application/json'
    }
}).then(res => res.json())
.then(album => {
    console.log(album)
        let card = createClone()

        let img = card.querySelector('.card-img-top')
        let title = card.querySelector('.card-title')
        let artist = card.querySelector('.card-text')

        img.src = album.cover_big
        title.innerText = album.title
        artist.innerText = album.artist.name
        title.href = `album.html?id=${idAlbum}`
        artist.href = `artist-page.html?id=${album.artist.id}`

        document.querySelector('.row-albums').append(card)
})
}

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

