document.getElementById('login').addEventListener("click", () => {
    let sendTo = "/passwordCheck";
    let firstPwInput = document.getElementById('f1PW');
    let secondPwInput = document.getElementById('f2PW');
    let email = sessionStorage.getItem("email");
    fetch(
            sendTo, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pw1: firstPwInput.value,
                    pw2: secondPwInput.value,
                    email: email
                })
            })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data === "No rows found") {
                console.log("Not in database!");
                //Bitte hier label mit ansprechenen Fehler!
            } else if(data === "The password typed in wasn't correct!") {
                console.log(data);
                //Bitte hier label mit ansprechenen Fehler!
            }  else {
                console.log("ready");
                var s = window.location.href;
                s = s.substring(0, s.indexOf("/reset"));
                window.location.href = `${s}/index.html`;
            }
        });
});