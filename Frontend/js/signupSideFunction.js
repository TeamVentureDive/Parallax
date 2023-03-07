function fetchDataToServer() {
    let signup = "http://localhost:6969/signup";
    console.log("signup fetch!")
    let usernameInput = document.getElementById('usernameInput');
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');

    const formData = new URLSearchParams();
    formData.append('username', usernameInput.value);
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);

    fetch(
        signup,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        .then((response) => response.text())
        .then(data => {
            console.log(data);
        });
}