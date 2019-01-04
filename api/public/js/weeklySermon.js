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
      }//endif
    });// end keypress function
  }); // sermon on click function

}); // end ready function

$('.form').hide();

function clicked() {
    updateText($('.sermon-text'));
    $('.sermon-text').text($('#sermonInput').val());
    $('.sermon-speaker').text($('#speakerInput').val());
}

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

///////////////////////////////////SUBMIT BUTTON/////////////////////////

$(function() {
    var a = $("#browserAlert");
    a.hide();
    $.ajax({
        url: "https://cdn.rawgit.com/arasatasaygin/is.js/master/is.min.js",
        dataType: "script",
        success: function() {
            if (is.edge() || is.ie()) {
                a.find("span").text("View on Chrome/Firefox.");
                a.show();
                a.addClass("active");
            }
        }
    });
    var b = $("button.btnSubmit");
    var c = $("svg.loader");
    var d = $("svg.checkmark");
    b.on("click", function() {
        if ($(this).hasClass("clicked")) return;
        $(this).addClass("clicked");
        var a = $(this);
        var b = 600, e = 2500, f = 3e3;
        setTimeout(function() {
            a.append(c.clone());
            a.find("svg").removeClass("svg--template");
            a.find("svg").css("display", "initial");
        }, b);
        setTimeout(function() {
            a.text("");
            a.find("svg").remove();
            a.append(d.clone());
            a.find("svg").css("display", "initial");
            a.find("svg").removeClass("svg--template");
            a.addClass("done");
        }, b + e);
        setTimeout(function() {
            a.find("svg").remove();
            a.text("Submit");
            a.removeClass("clicked");
            a.removeClass("done");
        }, b + e + f);
    });
});
