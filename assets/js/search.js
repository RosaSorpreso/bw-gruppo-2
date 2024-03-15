function searchAndRedirect() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim().toLowerCase(); 

    if (searchTerm === '') {
        return;
    }
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const firstResult = data.data[0];
                const templateAlbum = document.getElementById('album-page');
                
                if (firstResult.type === 'track') {
                    generateAlbum(firstResult.album.id); 
                    appendAlbum();
                } else if (firstResult.type === 'album') {
                    generateAlbum(firstResult.id); 
                    appendAlbum();
                } else if (firstResult.type === 'artist' && firstResult.name.toLowerCase() === searchTerm) {
                    generateArtist(firstResult.id);
                    // Ad esempio: appendArtist();
                }
            }
        })
}

const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', searchAndRedirect);

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchAndRedirect();
    }
});

// Cambia colore del cuore
document.getElementById("heart-icon").addEventListener("click", function() {
    this.classList.toggle("text-danger");
});
