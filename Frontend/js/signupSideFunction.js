function fetchDataToServer() {
    console.log("signup fetch!")
    let usernameInput = document.getElementById('usernameInput');
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');

    /*const formData = new URLSearchParams();
    formData.append('username', usernameInput.value);
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);*/

    fetch(
        //signup,
        "signup",
        {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            //body: formData
            body: JSON.stringify({username: usernameInput.value, email: emailInput.value, password: passwordInput.value})
        })
        .then((response) => response.text())
        .then(data => {
            console.log(data);
        });
}