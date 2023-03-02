
function data() {
    let login = "http://localhost:6969/login";
    fetch(login).then((response) => response.json()).then((data) => {
        console.log(data);
    });
}



