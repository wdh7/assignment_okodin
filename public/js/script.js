$(document).ready(function() {
  // show or hide nav bar
  var path = $(location).attr('pathname');

  if (path !== '/login') {
    $('#nav').show();
  } else if (path === '/login') {
    $('#nav').hide();
  }

  // show or hide viking image
  let gender = $('#gender').html().toLowerCase();

  if (gender === 'male') {
    $('#vikingGuy').show()
    $('#vikingGirl').hide()
  } else if (gender === 'female'){
    $('#vikingGirl').show()
    $('#vikingGuy').hide()
  }
});
