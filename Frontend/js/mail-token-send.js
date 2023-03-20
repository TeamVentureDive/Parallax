function checkDatabaseForCode(token) {
     let sendTo = "http://localhost:2500/checkVerification";
     fetch(
        sendTo, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data === "No rows found") {
                console.log("Not in database!");
                //Bitte hier label mit ansprechenen Fehler!
            } else {
                var s = window.location.href;
                s = s.substring(0, s.indexOf("/reset"));
                window.location.href = `${s}/resetPwnewPw.html`;
            }
        })
}