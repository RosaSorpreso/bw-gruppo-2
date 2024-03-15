<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati inviati dal modulo
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Esempio di verifica delle credenziali (da sostituire con la tua logica di autenticazione)
    if ($username === "utente" && $password === "password") {
        // Reindirizza l'utente alla pagina index.html
        header("Location: index.html");
        exit();
    } else {
        echo "Credenziali non valide. Riprova.";
    }
} else {
    // Se non ci sono dati inviati tramite POST, reindirizza alla pagina di login
    header("Location: login.html");
    exit();
}
?>
