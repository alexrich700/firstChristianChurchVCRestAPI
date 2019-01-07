$(document).ready(function(){
  $.getJSON("/api/users/getCurrentUser")
  .then(addCurrentUser);
  
});

function addCurrentUser(user) {
    if(user != null) {
        $('.container').addClass('hide');
        var test = $('<div>Welcome ' + user.name + '</div>');
        var logoutBtn = $(
        ' <div class="col-md-12 bu"> ' +
        '  <a class="button" href="https://victoriafirstchristianchurch.net/api/users/logout" role="button"> ' +
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