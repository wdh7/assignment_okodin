$(document).ready(function() {
  // show or hide nav bar
  var path = $(location).attr('pathname');

  if (path !== '/login') {
    $('#nav').show();
  } else if (path === '/login') {
    $('#nav').hide();
  }
});
