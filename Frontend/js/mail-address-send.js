document.getElementById('login').addEventListener("click", () => {
    let sendTo = "http://localhost:2500/sendMail";
    let emailInput = document.getElementById('email');
    sessionStorage.setItem("email", emailInput.value);
    fetch(
            sendTo, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value
                })
            })
        .then((response) => response.json())
        .then((data) => {
            if (data === "No rows found") {
                console.log("Not in database!");
                //Bitte hier label mit ansprechenen Fehler
            } else {
                var s = window.location.href;
                s = s.substring(0, s.indexOf("/reset"));
                window.location.href = `${s}/resetPwToken.html`;
            }
        });
});