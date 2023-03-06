document.addEventListener("DOMContentLoaded", () => {
    
  const tokenInput = document.getElementById("token-input");
  const tokenFields = tokenInput.querySelectorAll("input");
  const loginButton = document.getElementById("tokenpress");
  tokenFields.forEach((field, index) => {
    field.addEventListener("input", (event) => {
      const input = event.target;
      const nextInput = tokenFields[index + 1];
      const previousInput = tokenFields[index - 1];

      // Only allow numbers
      input.value = input.value.replace(/[^0-9]/g, "");

      // Add underline to empty fields
      tokenFields.forEach((field) => {
        if (!field.value) {
          field.classList.add("border-b-2", "border-dashed");
        } else {
          field.classList.remove("border-b-2", "border-dashed");
        }
      });

      if (
        !input.value &&
        previousInput &&
        (event.inputType === "deleteContentBackward" || event.keyCode === 8)
      ) {
        // Move focus to previous field when backspace is pressed and current field is empty
        previousInput.focus();
        previousInput.setSelectionRange(
          previousInput.value.length,
          previousInput.value.length
        );
      } else if (
        input.value &&
        nextInput &&
        input.value.length >= input.maxLength
      ) {
        // Move focus to next field when current field is filled and has reached its maximum length
        nextInput.focus();
      } else if (
        (input.value &&
          nextInput &&
          event.inputType !== "deleteContentBackward" &&
          event.keyCode !== 8) ||
          (event.inputType === "insertText" &&
          input.value.length >= input.maxLength) && (undefined === false)
          ) {
            console.log(nextInput === undefined)
            // Move focus to next field when current field is filled but the user continues typing (even if the field has already reached its maximum length) or if the user typed in a new value after pressing backspace and is in a field with a value
        nextInput.focus();
      } else if (!input.value && previousInput) {
        // Move focus to previous field when current field is empty
        previousInput.focus();
        previousInput.setSelectionRange(
          previousInput.value.length,
          previousInput.value.length
        );
      }

      // Concatenate all field values into a single token string
      const token = Array.from(tokenFields).reduce((token, field) => {
        return token + field.value;
      }, "");

      if (token.length < 7) {
        //Code macht erst sinn wenn bug gefixt ist. Dann ist der geil
        loginButton.innerHTML = `${7 - token.length} digits left`;
        loginButton.style.background= 'linear-gradient(45deg, #C5A9B4, #343A50)';

      }
      if (token.length === 7) {
        loginButton.innerHTML = `Reset Password`;
        loginButton.style.background= 'linear-gradient(45deg, #4D194D, #212F45)';
      }

      console.log(token);
      if (token.length === 7) {
        // Wenn focus bug gefixxt is funktioneirt das. Jetzt muss man hier 6 eingeben.
        loginButton.disabled = false;
      } else {
        loginButton.disabled = true;
      }
    });
  });

  tokenInput.addEventListener("keydown", (event) => {
    const focusedInput = document.activeElement;

    if (event.keyCode === 8 && !focusedInput.value) {
      // Move focus to previous field when backspace is pressed and current field is empty
      const previousInput = focusedInput.previousElementSibling;

      if (previousInput) {
        event.preventDefault();
        previousInput.focus();
        previousInput.setSelectionRange(
          previousInput.value.length,
          previousInput.value.length
        );
      }
    }
  });

  loginButton.addEventListener("click", () => {
    const token = Array.from(tokenFields).reduce((token, field) => {
      return token + field.value;
    }, "");
    console.log(token);
  });
});
