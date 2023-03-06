
//document.getElementById('login').addEventListener("click", fetchDataFromServer);


function fetchDataFromServer() {
    let login = "http://localhost:6969/login";
    console.log("fetchDataFromServer() called")
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    fetch(
        login,
        {
            method: "POST",
            body: {email: email.value, password: password.value}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}



