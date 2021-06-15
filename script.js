var CLOUDINARY_URL = '	https://api.cloudinary.com/v1_1/naman001/upload';
var CLOUDINARY_UPLOAD_PRESET = 'rphxt4yf';
// var picture = document.getElementById('picture')
let result = document.querySelector('.result'),
img_result = document.querySelector('.img-result'),
img_w = document.querySelector('.img-w'),
img_h = document.querySelector('.img-h'),
options = document.querySelector('.options'),
save = document.querySelector('.save'),
cropped = document.querySelector('.cropped'),
dwn = document.querySelector('.download'),
upload = document.querySelector('#file-input'),
cropper = '';
var counter=0;



// on change show image with crop options
upload.addEventListener('change', e => {
  if (e.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target.result) {
        // create new image
        let img = document.createElement('img');
        img.id = 'image';
        img.src = e.target.result;
        // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide');
        options.classList.remove('hide');
        // init cropper
        cropper = new Cropper(img);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
croppedGlobal=document.createElement("img");
save.addEventListener('click', e => {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas({
    // width: img_w.value // input value
  }).toDataURL(); //object type
  // console.log(imgSrc);
  // remove hide class of img
  cropped.classList.remove('hide');
  img_result.classList.remove('hide');
  // show image cropped
  cropped.src = imgSrc;
  counter++;
  sendToCloud(imgSrc);
});
function sendToCloud(croppedImg){
  if(counter>=1){
save.addEventListener('click', function(event) {
  var file = croppedImg;
  var formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then(function(res) {
    alert('File uploaded to cloud');
    console.log(res);
    document.getElementById("imageurl").href = res.data.secure_url;
    document.getElementById("imageurl").innerHTML = 'Click to Open cropped image';
    

  }).catch(function(err) {
    alert('Failes to upload plesae try again');
    console.log(err);
  });

});
  }
}


