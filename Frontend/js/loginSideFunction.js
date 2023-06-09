
//document.getElementById('login').addEventListener("click", fetchDataFromServer);


function fetchDataFromServer() {
    console.log("login fetch!")
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');

    /*const formData = new URLSearchParams();
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);*/

    fetch(
        //login,
        "login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {email: emailInput.value, password: passwordInput.value}
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
        });
}



