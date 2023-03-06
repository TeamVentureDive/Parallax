
//document.getElementById('login').addEventListener("click", fetchDataFromServer);


function fetchDataFromServer() {
    let login = "http://localhost:6969/login";
    console.log("login fetch!")
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');

    const formData = new URLSearchParams();
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);

    fetch(
        login,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}



