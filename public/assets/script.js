const imgElement = document.getElementById("show-image");
const fileElement = document.getElementById("image");

fileElement.addEventListener('change', showImage);

function showImage(event) {
    imgElement.src = URL.createObjectURL(event.target.files[0]);
    imgElement.onload = ()=> URL.revokeObjectURL(imgElement.src);
};