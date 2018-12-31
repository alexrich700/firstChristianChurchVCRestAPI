/* global $ */
$(document).ready(function(){
  $.getJSON("/api/text")
  .then(addTexts);

  //updates text on screen after click
  $('.list').on('click', '.sermon-text', function(text){
    $('.form').show();
    //puts current text in form fields 
    $('#sermonInput').val($('.sermon-text')[0].innerText);
    $('#speakerInput').val($('.sermon-text')[1].innerText);
    
    // when enter is pressed this runs
    $('.form').keypress(function(event){
      if(event.which == 13) {
        updateText($('.sermon-text'));
        $('.sermon-text').text($('#sermonInput').val());
        $('.sermon-speaker').text($('#speakerInput').val());
        $("#speakerInput").notify(
          "Successfully Updated", 
          "success"
        );
      }//endif
    });// end keypress function
  }); // sermon on click function

}); // end ready function

$('.form').hide();

//displays text
function addTexts(texts) {
  //add texts to page here
  texts.forEach(function(text){
    addText(text);
  });
}

//format text
function addText(text){
  var newText = $('<div class="sermon-text col-md-6">'+text.text +'</div><div class="sermon-text sermon-speaker col-md-6">' +text.name+'</div>');
  newText.data('id', text._id);
  $('.list').append(newText);
}

// updates text in db
function updateText(text){
  var updateUrl = '/api/text/' + text.data('id');
  var userInput = {
    text: $('#sermonInput').val(),
    name: $('#speakerInput').val()
  };
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: userInput
  });
}