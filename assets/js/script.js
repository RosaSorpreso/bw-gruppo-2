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
        // title.href = `album.html?id=${idAlbum}`
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

fillAllAlbums ();
document.addEventListener('DOMContentLoaded', function () {
    let searchForm = document.querySelector('form');
    let sideDx = document.getElementById('ciaone');

    // Get the container where cards will be appended
    let container = document.querySelector('#home-content');

    // Initialize an empty string to store card HTML
    let templateHTML = `   
    <form id="searchForm">
    <input type="text" id="searchInput" placeholder="Cerca traccia o album">
    <button type="submit">Cerca</button>
</form>`

    ;

    let i = 0;
    if (i % 5 === 0) {
        templateHTML += `</div><div class="row px-2">`;
        for (i = 1; i <= 50; i++) {
            // Append each card template to the templateHTML string
            templateHTML += `
            <div class="col-md-2 mb-4 px-5">
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">Card ${i}</p>
                    </div>
                </div>
            </div>`;
        }
    }
    container.innerHTML = templateHTML;

    // Get the parent of the template
    let templatesField = document.getElementById('templates-field');

    // Add click event listener to the form
    searchForm.addEventListener('click', function (event) {
        // Prevent the default action of the form
        event.preventDefault();
        sideDx.style.display = 'none';// NON SO PERCHE NON FUZNIONA
        // Replace the content of templates-field with the template
        templatesField.innerHTML = templateHTML;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        let searchTerm = document.getElementById('searchInput').value.trim();

        let foundAlbumId = findAlbumId(searchTerm); 

        if (foundAlbumId) {
            window.location.href = `album.html?id=${foundAlbumId}#ciao1`;
        } else {

            console.log("Nessun risultato trovato per la ricerca.");
        }
    });
});

