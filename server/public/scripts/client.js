console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
  $('#viewKoalas').on('click', '.deleteBtn', function() {
    const koalaId = $(this).data('id');
    deleteKoala(koalaId);
  }) // end delete koala
  $('#viewKoalas').on('click', '.transfer-btn', function() {
    let id = $(this).data('id');
    updateTransfer(id);
  }) // end transfer button click

  $('#viewKoalas').on('click', '.editBtn', function() {
    let id = $(this).data('id');
    getSingleKoala(id);
  }) // end edit button click

}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
        // display on DOM with buttons that allow edit of each
        displayKoalas(data);
    } // end success
  }); //end ajax

} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#nameIn').val('');
      $('#ageIn').val('');
      $('#genderIn').val('');
      $('#readyForTransferIn').val('');
      $('#notesIn').val('');
      getKoalas();
    } // end success
  }); //end ajax
}

function displayKoalas(koalas) {
  let $tableBody = $('#viewKoalas');
  $tableBody.empty();
  for(let row=0; row<koalas.length; row++) {
    let keys = Object.keys(koalas[row]);
  
    let $tr = $('<tr>');
    for(let col=0; col<keys.length + 2; col++) {
        //$tr.append($('<td>').attr('id', keys[col]).text(koalas[row][keys[col]]), $('<button>').data('id', koalas[row].id).addClass('transfer-btn').text('Ready for Transfer')[0]);
        if(col === keys.length){
          $tr.append($('<td>').addClass(keys[col]).append($('<button>').data('id', koalas[row].id).text('Delete').addClass('deleteBtn')));
        } else if (col === keys.length +1) {
          $tr.append($('<td>').addClass(keys[col]).append($('<button>').data('id', koalas[row].id).text('Edit Koala').addClass('editBtn')));
        } else {
          $tr.append($('<td>').addClass(keys[col]).text(koalas[row][keys[col]])[0]);
        }
    } // end col loop
    
    
    $tableBody.append($tr);
    if($('.ready_to_transfer:last').text() === 'N' ){
      $('.ready_to_transfer:last').append($('<button>').data('id', koalas[row].id).addClass('transfer-btn ml-2').text('Ready for Transfer')[0]);
    }
  } // end row loop

} // end displayKoalas

function deleteKoala(id) {
  $.ajax({
    type: 'DELETE',
    url: `/koala/${id}`,
  }) // end AJAX
  .done((response) => {
    console.log('Koala deleted');
    getKoalas();
  }) // end done
  .fail((error) => {
    console.log('error', error);
  }) // end fail
} // end deleteKoala

function updateTransfer(id) {
  $.ajax({
    type: 'PUT',
    url: `/koala/${id}`,
    data: {id}
  }) // end AJAX
  .done(function (response) {
    console.log('Updated koala transfer status');
    getKoalas();
  }) // end done
  .fail(function (error){
    console.log(error);
  }) // end fail
} // end updateTransfer

// get koala by id
function getSingleKoala(id) {
  $.ajax({
    type: 'GET',
    url: `/koala/${id}`,
  }) // end GET
  .done((response) => {
    console.log('edit koala');
    
  showKoalaInfo(response);
  }) // end done
  .fail(function(error){
    console.log(error);
  })
} // end editKoala

function showKoalaInfo(koala) {
  let newKoala = {
    id: koala[0].id,
    name: koala[0].name,
    age: koala[0].age,
    gender: koala[0].gender, 
    ready_to_transfer: koala[0].ready_to_transfer,
    notes: koala[0].notes
  };

  $('#nameIn').val(koala[0].name);
  $('#ageIn').val(koala[0].age);
  $('#genderIn').val(koala[0].gender);
  $('#readyForTransferIn').val(koala[0].ready_to_transfer);
  $('#notesIn').val(koala[0].notes);
  $('#addKoala').append('<button id="updateBtn">Update Koala Info</button>');

  $('#updateBtn').on('click', function() {
    
    updateKoala(newKoala);
  }) // end update button click
} // end showKoalaInfo



function updateKoala(newKoala) {
  console.log(newKoala);

} // end updateTransfer





// end of class push







// screen