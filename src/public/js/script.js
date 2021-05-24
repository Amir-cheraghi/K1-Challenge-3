function mouseOverImg(e) {
    anime({
      targets: e,
      width: '35%',
      height: '35%',
    });
  }

  function mouseOutImg(e) {
    anime({
      targets: e,
      width: '30%',
      height: '30%',

    });
  }

 $('#addPhotoForm').on('submit' , function(ev){
   ev.preventDefault()
   let formData = new FormData(this)

   for (i=0 ; i<this[0].files.length ; i++) {
    formData.append(`image-${i}` , this[0].files[i])
   }
   console.log(...formData) 
 })