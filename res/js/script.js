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

    loadPosts()
      .then(function (posts) {
        displayPosts(posts)
        let likeButtons = $('.like-button');
        for (let likeButton of likeButtons) {
          $(likeButton).click(function (){
            if ($(this).hasClass('liked')){
              $(this).removeClass('liked');
            }
            else {
              $(this).addClass('liked');
            }
          })
        }
      })
      .catch(function() {
        alert('Error loading posts info')
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

function loadPosts() {
  return $.get(
    {
      url: 'https://private-anon-ffc569fdf1-wad20postit.apiary-mock.com/posts',
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

function displayPosts(posts) {
  for (let post of posts){
    result = "";
    result += `<div class="post">
      <div class="post-author">
        <span class="post-author-info">
          <img src="${post.author.avatar}" alt="Post author">
          <small>${post.author.firstname + " " + post.author.lastname}</small>
        </span>
        <small>${post.createTime}</small>
      </div>`

    if (post.media !== null){
      if (post.media.type === "image"){
        result += `<div class="post-image">
          <img src="${post.media.url}" alt="">
        </div>`
      }
      else if (post.media.type === "video"){
        result += `<div class="post-video">
          <video width="320" height="240" controls>
            <source src=${post.media.url} type="video/mp4">
            <source src=${post.media.url} type="video/ogg">
            Your browser does not support the video tag.
            </video>
        </div>`
      }
    }

    if (post.text !== null){
      result += `<div class="post-title">
        <h3>${post.text}</h3>
      </div>`
    }

    result += `<div class="post-actions">
        <button type="button" name="like" class="like-button">${post.likes}</button>
      </div>
    </div>`

    $('.main-container').append(result);
  }
}
