document.getElementById('login').addEventListener("click", () => {
    let login = "http://localhost:6969/sendMail";
    let emailInput = document.getElementById('email');
    fetch(
        login,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value
        })})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
    });
    var s = window.location.href;
    s = s.substring(0, s.indexOf("/reset"));
    window.location.href = `${s}/resetPwToken.html`;
});