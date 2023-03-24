doument.querySelector('input[type="file"]');
  input.addEventListener('change', (e) => {
    const fd = new FormData();
    // add all selected files
    e.target.files.forEach((file) => {
      // IM SERVER WIRD NUR DIE DATEI DIE "Upload" HEIßt HOCHGELADEN!!!
      fd.append(e.target.name, file, file.name);
    });
    // create the request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'localhost:5000', true);
    xhr.send(fd);
});