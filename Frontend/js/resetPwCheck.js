
    const newpw = document.getElementById("newPwInp");
    const confnewpw = document.getElementById("newPwInpConf");
    const restbut = document.getElementById("login");
    const errortext = document.getElementById("errormsg");


    errormsg
    restbut.addEventListener("click", () => {
        if(newpw.value === confnewpw.value&& newpw.value !=""&& confnewpw.value !=""){
            console.log("Passwords match");
            errortext.innerHTML = "";


        }else{
            console.log("Passwords don't match");
            errortext.innerHTML = "Passwords don't match";
        }
    });
