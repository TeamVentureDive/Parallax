function checkDatabaseForCode(token) {
     let sendTo = "http://localhost:6969/checkVerification";
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
            } else {
                var s = window.location.href;
                s = s.substring(0, s.indexOf("/reset"));
                window.location.href = `${s}/resetPwnewPw.html`;
            }
        })
}