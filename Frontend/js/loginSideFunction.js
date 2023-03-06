
//document.getElementById('login').addEventListener("click", fetchDataFromServer);


function fetchDataFromServer() {
    let login = "http://localhost:6969/login";
    console.log("fetchDataFromServer() called")
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');
    fetch(
        login,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
        })})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}



