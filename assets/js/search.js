function generateArtist(artistId) {
    // Implementa la logica per generare la pagina dell'artista
    // Questa funzione dovrebbe caricare i dati dell'artista dall'API e generare la pagina di conseguenza
}

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
                    // Qui dovresti implementare una funzione per appendere la pagina dell'artista al DOM
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

// Aggiungi un evento di click all'icona del cuore
document.getElementById("heart-icon").addEventListener("click", function() {
    // Alterna la classe 'text-success' per cambiare il colore in verde
    this.classList.toggle("text-success");
});
