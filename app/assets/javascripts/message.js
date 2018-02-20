$(function(){
  function buildHTML(message){
    var image = (message.image.url == null) ? "" :`<img src = "${ message.image.url }">`
    var html = `<div class = "main-content__message">
                  <div class = "main-content__message__user-name">
                    <div class = "main-content__message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class = "main-content__message__time">
                      ${ message.created_at }
                    </div>
                    <div class = "main-content__message__body">
                      ${ message.content }
                      ${ image }
                    </div>
                  </div>
                </div>`
    return html;
  }
  function resetContent(){
    $('.main-content__footer-body__message').val('')
    $('.main-content__footer-body__image-file__image').val('')
    $('.main-content__footer-body__submit').removeAttr("disabled");
  };
  function flashMessage(){
    var notice = `<div class="notice">メッセージが送信されました</div>`
    return notice;
  };
  $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      cache: false,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var notice = flashMessage();
      $('.main-content__body__messages-list').append(html)
      $('.notification').append(notice);
      $('.notice').fadeOut(3000);
      $('.main-content__body').animate({scrollTop: $('.main-content__body')[0].scrollHeight}, 'fast');
      resetContent();
    })
    .fail(function(){
      alert("メッセージが送信されませんでした");
      resetContent();
    })
  })
})
