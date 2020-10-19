let activeUserInfo = null;

$(function () {

    $('#avatar-button').click(function () {
      $('#active-user-info-container').toggle();
    });

    loadActiveUserInfo()
      .then(function (user) {
        displayActiveUserInfo(user)
      })
      .catch(function() {
        alert('Error loading user info')
      });

});

function loadActiveUserInfo() {
  return $.get(
    {
      url: 'https://private-anon-ffc569fdf1-wad20postit.apiary-mock.com/users/1',
      success: function(response){
        return response;
      },
      error: function(){
        alert('error')
      }
    }
  )
}

function displayActiveUserInfo(user) {
  $('#active-user-name').text(user.firstname + " " + user.lastname);
  $('#active-user-email').text(user.email);
  $('#avatar-image').attr('src', user.avatar);
}
