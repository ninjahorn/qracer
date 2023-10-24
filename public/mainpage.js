document.getElementById('getPointButton').addEventListener('click', async () => {
    const username = document.getElementById('user-name').value;
    const wronginput = "Falsche Eingabe!! Erlaubt sind: Buchstaben (A-Z ohne Umlaute) // Zahlen (0-9)";
    const regex = /^[a-zA-Z0-9]+$/; // Erlaubt nur Zeichen von a-z, A-Z und Zahlen 0-9

    if (regex.test(username)) {
    document.getElementById('wronginput').innerHTML = ''; // Zurücksetzen des Fehlermeldungs-Elements
    document.getElementById('user-name').value = '';

    // Hier ruf die Route /check-score auf, um den Score zu erhalten
    try {
    const response = await fetch('/check-score?username=' + username);

    if (response.ok) {
        const data = await response.json();

        // Prüfe, ob eine Nachricht über den Score zurückgegeben wurde
        if (data.message) {
            document.getElementById('message').textContent = data.message;        
        } else {
            // Zeige den Score an
            document.getElementById('message').textContent = `Der Score von ${username} beträgt: ${data.score}`;
        }
    } else {
        document.getElementById('message').textContent = 'Fehler beim Abrufen der Daten vom Server.';
    }
    } catch (error) {
    console.error('Fehler beim Fetchen der Daten:', error);
    document.getElementById('message').textContent = 'Fehler beim Abrufen der Daten vom Server.';
    }
    } else {
    document.getElementById('wronginput').innerHTML = wronginput;
    }
});
  