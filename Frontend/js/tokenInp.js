document.addEventListener("DOMContentLoaded", () => {
    
  const resetbutton = document.getElementById("tokenpress");
  const children = document.querySelectorAll("input");
for (let i = 0; i < children.length; i++) {

    const input = children.item(i);
    const prevInput = (i != 0) ? children.item(i - 1) : input;
    const nextInput = (i != children.length - 1) ? children.item(i + 1) : input;

    input.addEventListener("input", inputEvent => inputEvent.preventDefault());
    
    input.addEventListener("keydown", keyEvent => {
      //console.log(i+1); //TODO
      /*if(i != 6){
        resetbutton.innerHTML = `${7 - (i+1)} digits left`;
        resetbutton.style.background= 'linear-gradient(45deg, #C5A9B4, #343A50)';
      }else{
        resetbutton.innerHTML = `Reset Password`;
        resetbutton.style.background= 'linear-gradient(45deg, #4D194D, #212F45)';
      }*/
      
        keyEvent.preventDefault();
        if (new RegExp("[^0-9]").test(keyEvent.key) && keyEvent.key != "Backspace") return;
        if (new RegExp("[0-9]").test(keyEvent.key)) {
            input.classList.remove("border-b-2", "border-dashed");
            input.value = keyEvent.key;
            nextInput.focus();
            resetbutton.addEventListener("click", () => {
              const token = Array.from(children).reduce((token, field) => {
                return token + field.value;
              }, "");
              console.log(token);
            });
            let counter = 0;
            for (let ii = 0; ii < children.length; ii++){
              if (children.item(ii).value.length == 0) {
                counter++;
              }
            }
            if (counter == 0) {
              resetbutton.innerHTML = `Reset Password`;
              resetbutton.style.background= 'linear-gradient(45deg, #4D194D, #212F45)';
              resetbutton.disabled = false;

            }else {
              resetbutton.innerHTML = `${counter} digits left`;
              resetbutton.disabled = true;
            }
            return;
        }
        input.value = "";
        prevInput.focus();
        input.classList.add("border-b-2", "border-dashed");
        let counter = 0;
        for (let ii = 0; ii < children.length; ii++){
          if (children.item(ii).value.length == 0) {
            counter++;
          }
        }
        if (counter == 0) {
          resetbutton.innerHTML = `Reset Password`;
          resetbutton.style.background= 'linear-gradient(45deg, #C5A9B4, #343A50)';
        }else {
          resetbutton.innerHTML = `${counter} digits left`;
          resetbutton.style.background= 'linear-gradient(45deg, #C5A9B4, #343A50)';
          resetbutton.disabled = true;

        }
        
    });
}
});