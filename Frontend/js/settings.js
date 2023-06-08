function closeSettings() {
    window.location.href = "dataTransfer.html";
}
function resetPassword() {
    window.location.href = "resetPwEmail.html";
}



// JavaScript code to handle button clicks and toggle sections
const accountSettingsBtn = document.getElementById("accountSettingsBtn");
const loginSecurityBtn = document.getElementById("loginSecurityBtn");
const accountSettingsSection = document.getElementById("accountSettingsSection");
const loginSecuritySection = document.getElementById("loginSecuritySection");

accountSettingsBtn.addEventListener("click", function() {
  accountSettingsBtn.classList.add("bg-gray-200");
  loginSecurityBtn.classList.remove("bg-gray-200");
  accountSettingsSection.classList.remove("hidden");
  loginSecuritySection.classList.add("hidden");
  accountSettingsBtn.classList.remove("font-light");
  accountSettingsBtn.classList.add("font-semibold");
  loginSecurityBtn.classList.add("font-light");
  loginSecurityBtn.classList.remove("font-semibold");

});

loginSecurityBtn.addEventListener("click", function() {
  accountSettingsBtn.classList.remove("bg-gray-200");
  loginSecurityBtn.classList.add("bg-gray-200");
  accountSettingsSection.classList.add("hidden");
  loginSecuritySection.classList.remove("hidden");
  accountSettingsBtn.classList.add("font-light");
  accountSettingsBtn.classList.remove("font-semibold");
  loginSecurityBtn.classList.remove("font-light");
  loginSecurityBtn.classList.add("font-semibold");

});
