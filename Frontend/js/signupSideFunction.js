
function fetchDataToServer() {

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        query: JSON.stringify({
            username: 'Benutzername',
            password: 'Passwort'
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}