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
    if($(`#${modalId}`).length === 0){
      $.ajax({
        url : `${window.location}api/photos/${modalId}`,
        type : 'GET',
        async : true,
        beforeSend: ()=>{
          $('body').append(
          `<div class="modal fade" id="loadingModal" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-body d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>  
                </div>
              </div>
            </div>  
          </div>
          `
          )
        $('#loadingModal').modal({backdrop:false})
       },
       complete: ()=>{
         $('#loadingModal').remove()
      },
        success : (res)=>{
          $('body').append(`
          <div class="modal fade" id="${modalId}" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">${res.data.title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body row pt-0 pb-0 pr-0">
                    <div class="col-3 p-0 d-flex flex-column justify-content-start">
                      <div class="d-flex flex-column justify-content-center mt-2">
                        <span class="  mb-5 text-left pl-2">Title : ${res.data.title} </span>
                        <span class="  mb-5 text-left pl-2">Width : ${res.data.width}</span>
                        <span class="  mb-5 text-left pl-2">Height : ${res.data.height} </span>
                        <span class="  mb-5 text-left pl-2">Upload Date : ${new Date(res.data.createdAt || Date.now()).toISOString()}</span>
                        <span class="  mb-5 text-left pl-2">Size : ${res.data.size}</span>
                      </div>
                      <div class="d-flex flex-column justify-content- h-25">
                        <div class="d-flex justify-content-center"><button class="btn btn-warning mb-3 w-50"
                            data-target="#edit-${res.data._id}" data-toggle="modal">Edit</button></div>
                        <div class="d-flex justify-content-center"><button class="btn btn-danger mb-3 w-50" data-target="#remove-${res.data._id}" data-toggle="modal">Remove</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 pl-0">
                      <img class="w-100 h-100 rounded-bottom" src="${res.data.largePhotoPath}">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            


            <div class="modal fade" id="edit-${res.data._id}" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit - ${res.data.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              to Edit Picture & Title Please Enter Values And Sumbit

              <div class="input-group input-group-sm mb-3 mt-3 w-75">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" value="${res.data.title}" name="title" id="title"
                  aria-describedby="inputGroup-sizing-sm">
              </div>

              <div class="input-group mb-3  w-75">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Photo</span>
                  </div>
                  <div class="custom-file">
                    <input type="file" accept="image/*" class="custom-file-input" id="formPhotos">
                    <label class="custom-file-label text-left" for="inputGroupFile01">Select Photo</label>
                  </div>
                </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-warning" onclick="">Submit</button>
              </div>

            </div>
          </div>
        </div>
      </div>



      <div class="modal fade" id="remove-${res.data._id}" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Remove - ${res.data.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <div class="m-3">Are Sure You Wanna Delete "${res.data.title}" ???</div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" data-id = ${res.data._id} id="removeSelf" onclick="removeSelf(this)">Delete</button>
              </div>

            </div>
          </div>
        </div>
      </div>
            `)
            $(`#${modalId}`).modal()
        }
      })
     
    }
      $(`#${modalId}`).modal()
  }





 $('#addPhotoForm').on('submit' , function(ev){
   ev.preventDefault()
   let formData = new FormData(this)

   for (i=0 ; i<this[0].files.length ; i++) {
    formData.append(`photos` , this[0].files[i])
   }

   $.ajax({
     type : 'POST',
     url : `${window.location}api/photos`,
     async : true,
     processData : false,
     contentType  : false,
     data : formData,
     beforeSend : ()=>{
      $('#addPhotos').attr('disabled','true')
      $('#addPhotos').html(`
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div> `
    )},
     success : (res)=>{
       if(res.status === 'success')
        setTimeout(location.reload(),1000)
     }
   })
 })


 $('#removeAllPhotos').on('click' , ()=>{

  $.ajax({
    type : 'DELETE',
    url : `${window.location}api/photos`,
    async : true,
    beforeSend : ()=>{
      $('#removeAllPhotos').attr('disabled','true')
      $('#removeAllPhotos').html(`
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div> `
    )
    },
    success : (res)=>{
      if(res.status === 'success')
       setTimeout(location.reload(),1000)
    }
  })
})


function removeSelf(e){
  const id = $(e).attr('data-id')
  console.log(id)
  $.ajax({
    type : 'DELETE',
    url : `${window.location}api/photos/${id}`,
    async : true,
    beforeSend : ()=>{
      $('#removeSelf').attr('disabled','true')
      $('#removeSelf').html(`
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div> `
    )
    },
    success : (res)=>{
      if(res.status === 'success')
       setTimeout(location.reload(),1000)
    }
  })
}