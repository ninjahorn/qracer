  /*
  document.getElementById('getPointButton').addEventListener('click', async () => {
    const username = document.getElementById('user-name').value;
    const wronginput = "Falsche Eingabe!! Erlaubt sind: Buchstaben (A-Z ohne Umlaute) // Zahlen (0-9)";
    const regex = /^[a-zA-Z0-9]+$/; // Erlaubt nur Zeichen von a-z, A-Z und Zahlen 0-9
    //const regex = '^[a-zA-Z0-9]+$'; 
  
    if (regex.test(username)) {
        document.getElementById('wronginput').innerHTML = ''; // Zurücksetzen des Fehlermeldungs-Elements
        document.getElementById('user-name').value = '';
        
        const response = await fetch('/check-username?username=' + username);
    
        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = data.message;
        } else {
            document.getElementById('message').textContent = 'Fehler beim Abrufen der Daten vom Server.';
        }
        

    } else {
    document.getElementById('wronginput').innerHTML = wronginput;
    }
  });
*/


  document.getElementById('getPointButton').addEventListener('click', async () => {
    const pageType = getPageType();
    const username = document.getElementById('user-name').value;
    const wronginput = "Falsche Eingabe!! Erlaubt sind: Buchstaben (A-Z ohne Umlaute) // Zahlen (0-9)";
    const regex = /^[a-zA-Z0-9]+$/; // Erlaubt nur Zeichen von a-z, A-Z und Zahlen 0-9
  
    if (regex.test(username)) {
        document.getElementById('wronginput').innerHTML = ''; // Zurücksetzen des Fehlermeldungs-Elements
        document.getElementById('user-name').value = '';
        
        const response = await fetch(`/check-scanned?username=${username}&page=${pageType}`);
  
        if (response.ok) {
          const data = await response.json();
          if (data.scanned) {
            document.getElementById('message').textContent = 'QR-Code wurde bereits gescannt.';
          } else {
            const scoreResponse = await fetch(`/check-username?username=${username}&page=${pageType}`);
            if (scoreResponse.ok) {
              const scoreData = await scoreResponse.json();
              document.getElementById('message').textContent = scoreData.message;
            } else {
              document.getElementById('message').textContent = 'Fehler beim Abrufen der Daten vom Server.';
            }
          }
        } else {
          document.getElementById('message').textContent = 'Fehler beim Überprüfen des gescannten QR-Codes.';
        }
        
    } else {
    document.getElementById('wronginput').innerHTML = wronginput;
    }
    
  });


  
  
  function getPageType() {
    if (window.location.pathname.includes("qrcode1000")) {
      return "qrcode1000";
    } else if (window.location.pathname.includes("qrcode2000")) {
      return "qrcode2000";
    } else if (window.location.pathname.includes("qrcode3000")) {
      return "qrcode3000";
    } else {
      return "";
    }
  }
  