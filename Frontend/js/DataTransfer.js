const fileDropArea = document.getElementById('file-drop-area');

fileDropArea.addEventListener('dragenter', function(event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'rgba(25, 53, 209, 0.5)';
});

fileDropArea.addEventListener('dragleave', function(event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'initial';
});

fileDropArea.addEventListener('dragover', function(event) {
    event.preventDefault();
});

fileDropArea.addEventListener('drop', function(event) {
    event.preventDefault();
    fileDropArea.style.backgroundColor = 'initial';

    const files = event.dataTransfer.files;

    // Handle the file upload here
    uploadFile(files);
});

function uploadFile(files) {
    // Create a FormData object to store the file
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('upload', files[0]);

    // Perform the file upload using your preferred method (e.g., AJAX request)
    // Replace the URL and request method with your own implementation
    const uploadUrl = 'https://example.com/upload';
    const uploadRequest = new XMLHttpRequest();

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

    uploadRequest.send(formData);
}
