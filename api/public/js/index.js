// import { url } from "inspector";

$(document).ready(function(){
  $.getJSON("/api/users/getCurrentUser")
  .then(addCurrentUser);
});


function sendSignUp(){
  document.getElementById('sbm-signup-form').submit();        
}

function sendLogin() {
  document.getElementById('sbm-login-form').submit();
}

function sendResetEmail() {
  document.getElementById("form-reset-pass").submit();
}

function TEST() {
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  console.log($('#reset-pass-form').serialize())
  console.log(token)
}

function sendResetPassword() {
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')
  $.ajax({
    type: 'POST',
    url: `/api/users/passwordreset?token=${token}`,
    data: $('#reset-pass-form').serialize()
  }).done(function(data){
    alert(data)
    addCurrentUser({"name" : $('#reset-pass-form'.email).val()})
    window.location.href = "/"
    return
  }).fail(function(data){
    alert(data)
  })
}


// function login(form) {
//   $.ajax({
//     type: 'POST',
//     url: '/api/users/login',
//     data: $(form).serialize()
//   }).done(function() {
//     addCurrentUser({"name" :$(form.email).val()})
//   })
// }

// function signup(form) {
//   $.ajax({
//     type: 'POST',
//     url: '/api/users/signup',
//     data: $(form).serialize()
//   }).done(function(res){
//     addCurrentUser({"name" : $(form.name).val()})
//   })
// }

function addCurrentUser(user) {
    if(user != null) {
        $('.container').addClass('hide');
        var test = $('<div>Welcome ' + user.name + '</div>');
        var logoutBtn = $(
        ' <div class="col-md-12 bu"> ' +
        '  <a class="button" href="/api/users/logout" role="button"> ' +
        '	<span>Logout</span> ' +
        '	<div class="icon"> ' +
        '		<i class="fas fa-sign-out-alt"></i> ' +
        '	</div> ' +
        '  </a> ' +
        ' </div>' 
        );
        $(".test").append(test);
        $(".logout").append(logoutBtn);
    } else {
        console.log('l');
    }
}



var $loginMsg = $('.loginMsg'),
    $login = $('.login'),
    $signupMsg = $('.signupMsg'),
    $signup = $('.signup'),
    $frontbox = $('.frontbox');
  
    $('#switch1').on('click', function() {
      $loginMsg.toggleClass("visibility");
      $frontbox.addClass("moving");
      $signupMsg.toggleClass("visibility");
    
      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });
    
    $('#switch2').on('click', function() {
      $loginMsg.toggleClass("visibility");
      $frontbox.removeClass("moving");
      $signupMsg.toggleClass("visibility");
    
      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });
    
    setTimeout(function(){
      $('#switch1').click();
    });
    
    setTimeout(function(){
      $('#switch2').click();
    });