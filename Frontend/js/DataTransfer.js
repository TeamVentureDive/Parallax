const inputElement = document.querySelector('input[type="file"]');
inputElement.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const imgElement = document.createElement('img');
    imgElement.src = url;
    document.body.appendChild(imgElement);
});

document.getElementById("image").addEventListener("click", () => {document.getElementById("imageUpload").click()});