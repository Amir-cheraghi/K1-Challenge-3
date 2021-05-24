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

 async function showSelf(e){
    const modalId = $(e).attr('data-target').replace(/#/,'')
    if($(`#${modalId}`).length === 0)
     $('body').append(`
    <div class="modal fade" id="${modalId}" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Picture Title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body row pt-0 pb-0 pr-0">
              <div class="col-3 p-0 d-flex flex-column justify-content-start">
                <div class="d-flex flex-column justify-content-center mt-2">
                  <span class="  mb-5 text-left pl-2">Title : </span>
                  <span class="  mb-5 text-left pl-2">Width : </span>
                  <span class="  mb-5 text-left pl-2">Heghit : </span>
                  <span class="  mb-5 text-left pl-2">Upload Date : </span>
                  <span class="  mb-5 text-left pl-2">Size : </span>
                </div>
                <div class="d-flex flex-column justify-content- h-25">
                  <div class="d-flex justify-content-center"><button class="btn btn-warning mb-3 w-50"
                      data-target="#edit-pic1" data-toggle="modal">Edit</button></div>
                  <div class="d-flex justify-content-center"><button class="btn btn-danger mb-3 w-50" data-target="#remove-pic1" data-toggle="modal">Remove</button>
                  </div>
                </div>
              </div>
              <div class="col-9 pl-0">
                <img class="w-100 h-100 rounded-bottom" src="/uploads/originalSize/photo_2021-05-08_11-08-38.jpg">
              </div>
            </div>
          </div>
        </div>
      </div>
      `)
      $(`#${modalId}`).modal()
  }

 $('#addPhotoForm').on('submit' , function(ev){
   ev.preventDefault()
   let formData = new FormData(this)

   for (i=0 ; i<this[0].files.length ; i++) {
    formData.append(`image-${i}` , this[0].files[i])
   }
   console.log(...formData) 
 })