const fillAlbum = (idAlbum, idImg, idTitle, idDes) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`, {
    headers:{
        'Content-type':'application/json'
    }
}).then(res => res.json())
.then(album => {
    let img = document.querySelector(`#${idImg}`)
    let title = document.querySelector(`#${idTitle}`)
    let description = document.querySelector(`#${idDes}`)

    img.src = album.cover
    title.innerText = album.title
    description.innerText = album.release_date
})
}

fillAlbum(75621062, 'img1', 'title1', 'date1')