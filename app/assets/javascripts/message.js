$(function(){
  function buildHTML(message){
    var image = (message.image.url == null) ? "" :`<img src = "${ message.image.url }">`;
    var html = `<div class = "main-content__message" data-message-id = "${ message.id }">
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
                </div>`;
    return html;
  };
  function resetContent(){
    $('.main-content__footer-body__message').val("");
    $('.main-content__footer-body__image-file__image').val("");
    $('.main-content__footer-body__submit').removeAttr("disabled");
  };
  function flashMessage(){
    var notice = `<div class="notice">メッセージが送信されました</div>`;
    return notice;
  };
  $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
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
      $('.main-content__body__messages-list').append(html);
      $('.notification').append(notice);
      $('.notice').fadeOut(3000);
      $('.main-content__body').animate({scrollTop: $('.main-content__body')[0].scrollHeight}, 'fast');
      resetContent();
    })
    .fail(function(){
      alert("メッセージが送信されませんでした");
      resetContent();
    })
  });

  //自動更新機能に関する記述
  $(function(){
    //今のグループチャット画面にいる限り
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
    //5秒ごとにupdate関数を呼び出す
      setInterval(update, 5000);
      };
    });
  function update(){
    //最新のmessage_idを取得
    var latestId = $('.main-content__message').last().data('message_id');
  //非同期通信の設定
  $.ajax({
    url: window.location.href,
    data: { latestId: latestId },
    dataType: 'json'
  })
  //通信成功時
  .done(function(messages){
    //二度目以降に残っていないよう削除
    var insertHTML = "";
    //Ajaxでもらったmessagesの各messageに対して
    messages.forEach(function(message) {
      //HTMLを作成
      insertHTML += buildHTML(message);
      // }
    });
    //作成したHTMLをチャット最後尾に追加
    $('.main-content__body__messages-list').html(insertHTML);
  })
  //通信失敗時
  .fail(function(data){
    alert("自動更新できませんでした");
  });
  };
});
