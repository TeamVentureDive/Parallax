const fileDropArea = document.getElementById('file-drop-area');

fileDropArea.addEventListener('dragenter', function (event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'rgba(25, 53, 209, 0.5)';
});

fileDropArea.addEventListener('dragleave', function (event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'initial';
});

fileDropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
});

fileDropArea.addEventListener('drop', function (event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'initial';

    const files = event.dataTransfer.files;

    // Handle the file upload here
    uploadFile(files);
});

const email = document.querySelector("#emailHere").innerText;
const password = document.querySelector("#passwordHere").value;

function uploadFile(files) {
    // Create a FormData object to store the file
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('upload', files[0]);
    formData.append("email", email);
    formData.append("password", password);

    // Perform the file upload using your preferred method (e.g., AJAX request)
    // Replace the URL and request method with your own implementation
    const uploadUrl = '/upload';

    fetch(uploadUrl, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data));

    /*const uploadRequest = new XMLHttpRequest();

    uploadRequest.open('POST', uploadUrl);

    uploadRequest.onload = function() {
        if (uploadRequest.status === 200) {
            // File uploaded successfully
            console.log('File uploaded!');
        } else {
            // Error occurred during upload
            console.error('File upload failed.');
        }
    };

    uploadRequest.send(formData);*/
}



document.getElementById('searchInput').addEventListener('keyup', function () {
    let searchQuery = this.value.toLowerCase();
    let names = document.getElementsByClassName('searchable-name');

    for (let i = 0; i < names.length; i++) {
        let name = names[i].textContent.toLowerCase();
        let parentDiv = names[i].closest('.border-2');

        if (name.includes(searchQuery)) {
            parentDiv.style.display = '';
        } else {
            parentDiv.style.display = 'none';
        }
    }
});
const field = document.getElementById("content-datatransfer");
const settings = document.getElementById("settingsover");
const contactsBtn = document.getElementById("addContactsBtn");
const messagesBtn = document.getElementById("messagesBtn");
const settingsBtn = document.getElementById("settingsBtn");
const addfriendCont = document.getElementById("addFriendContainer");

function openSettings() {
    field.classList.add("blur");
    settings.classList.remove("hidden");
    settingsBtn.classList.add("bg-gray-200");
}

function closeSettings() {
    field.classList.remove("blur");
    settings.classList.add("hidden");
    settingsBtn.classList.remove("bg-gray-200");
}

function addFriendPopUp() {
    field.classList.add("blur");
    addfriendCont.classList.remove("hidden");
    contactsBtn.classList.add("text-blue-800");
    contactsBtn.classList.add("bg-blue-50");
    messagesBtn.classList.remove("bg-blue-50");
    messagesBtn.classList.remove("text-blue-800");
}

function closeAddContacts() {
    field.classList.remove("blur");
    addfriendCont.classList.add("hidden");
    contactsBtn.classList.remove("text-blue-800");
    contactsBtn.classList.remove("bg-blue-50");
    messagesBtn.classList.add("bg-blue-50");
    messagesBtn.classList.add("text-blue-800");
}

document.addEventListener("click", function (event) {
    const target = event.target;
    const isAddFriendPopup = target.closest("#addFriendContainer");
    const isAddFriendButton = target.closest("#addContactsBtn");
    const isMessagesButton = target.closest("#messagesBtn");

    if (!isAddFriendPopup && !isAddFriendButton && !isMessagesButton && !addfriendCont.classList.contains("hidden")) {
        closeAddContacts();
    }
});

contactsBtn.addEventListener("click", function () {
    addFriendPopUp();
});

messagesBtn.addEventListener("click", function () {
    closeAddContacts();
});


document.addEventListener("click", function (event) {
    const target = event.target;
    const isAddFriendPopup = target.closest("#addFriendContainer");
    const isAddFriendButton = target.closest("#addContactsBtn");
    const isMessagesButton = target.closest("#messagesBtn");

    if (!isAddFriendPopup && !isAddFriendButton && !isMessagesButton) {
        closeAllPopups();
    }
});

contactsBtn.addEventListener("click", function () {
    addFriendPopUp();
});

messagesBtn.addEventListener("click", function () {
    closeAddContacts();
});



const accountSettingsBtn = document.getElementById("accountSettingsBtn");
const loginSecurityBtn = document.getElementById("loginSecurityBtn");
const accountSettingsSection = document.getElementById("accountSettingsSection");
const loginSecuritySection = document.getElementById("loginSecuritySection");

accountSettingsBtn.addEventListener("click", function () {
    accountSettingsBtn.classList.add("bg-gray-200");
    loginSecurityBtn.classList.remove("bg-gray-200");
    accountSettingsSection.classList.remove("hidden");
    loginSecuritySection.classList.add("hidden");
    accountSettingsBtn.classList.remove("font-light");
    accountSettingsBtn.classList.add("font-semibold");
    loginSecurityBtn.classList.add("font-light");
    loginSecurityBtn.classList.remove("font-semibold");

});

loginSecurityBtn.addEventListener("click", function () {
    accountSettingsBtn.classList.remove("bg-gray-200");
    loginSecurityBtn.classList.add("bg-gray-200");
    accountSettingsSection.classList.add("hidden");
    loginSecuritySection.classList.remove("hidden");
    accountSettingsBtn.classList.add("font-light");
    accountSettingsBtn.classList.remove("font-semibold");
    loginSecurityBtn.classList.remove("font-light");
    loginSecurityBtn.classList.add("font-semibold");

});

function copyCode() {
    let copyText = document.getElementById("hashCodeCopy");
    let copytextValue = copyText.innerText;
    navigator.clipboard.writeText(copytextValue);
}


function showNotification() {
    Toastify({
        text: "No Info for you (yet). In Germany we call it 'Kannziel'",
        duration: 3000, // Anzeigedauer in Millisekunden (hier 3 Sekunden)
        gravity: "top", // Position der Benachrichtigung ("top", "bottom", "center")
        position: "right", // Ausrichtung der Benachrichtigung ("left", "right", "center")
        backgroundColor: "linear-gradient(to right, #667eea, #764ba2)", // Hintergrundfarbe der Benachrichtigung
    }).showToast();
}




const hackenButt = document.getElementById("hacken");
hackenButt.addEventListener("click", addfriend);

function addfriend() {
    hackenButt.innerHTML = "Friend Added";
    hackenButt.classList.add("bg-green-500", "text-white");
    hackenButt.classList.remove("pl-1.5", "pr-1.5", "pb-0.5,", "rounded-full", "ml-20", "text-sm", "pb-0.5");
    hackenButt.classList.add("pl-1", "pr-1", "rounded-lg", "text-xs", "ml-1", "pl-1,5", "pr-1,5");
}

function handleClick(element) {
    // Retrieve the data from the clicked element
    var filename = element.getAttribute('data-filename');
    var name = element.getAttribute('data-name');
    var email = element.getAttribute('data-email');
    var lick = element.getAttribute('data-lick');

    // Update the content of the segment with the retrieved data
    document.getElementById('rightFilename').textContent = filename;
    document.getElementById('rightLink').href = lick;
    document.getElementById('rightName').textContent = name;
    document.getElementById('rightEmail').textContent = email;
}

const fileContainer = document.querySelectorAll(".file-container");
for (let i = 0; i < fileContainer.length; i++) {
    const currentFileContainer = fileContainer[i];
    fileContainer[i].addEventListener("click", () => handleClick(currentFileContainer));
}