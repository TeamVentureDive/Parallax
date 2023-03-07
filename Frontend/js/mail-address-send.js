document.getElementById('login').addEventListener("click", () => {
    let sendTo = "http://localhost:6969/sendMail";
    let emailInput = document.getElementById('email');
    console.log(emailInput);
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
            } else {
                var s = window.location.href;
                s = s.substring(0, s.indexOf("/reset"));
                window.location.href = `${s}/resetPwToken.html`;
            }
        });
});