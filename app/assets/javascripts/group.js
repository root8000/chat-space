$(function(){
  //グループメンバーのリスト
  var groupMember = $('#chat-group-users');
  //検索結果のリスト
  var searchList = $('#user-search-result');
  //追加ボタンが押されたuserのHTMLを作成
  function buildHTML(id, name){
    var html = `<div class="chat-group-user clearfix js-chat-member" id='chat-group-user-${ id }'>
                  <input name="group[user_ids][]" type="hidden" value="${ id }">
                  <p class="chat-group-user__name">
                    ${ name }
                  </p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
                    削除
                  </a>
                </div>`
    //グループメンバーリストの末尾に追加
    groupMember.append(html);
  }
  //インクリメンタルサーチされたuserのHTMLを作成
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    //検索結果リストの末尾に追加
    searchList.append(html);
  }
  //ユーザー不一致のHTMLを作成
  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">${ user }</div>`
    //検索結果リストの末尾に追加
    searchList.append(html);
  }
  //検索結果リストの各userに設置した追加ボタンが押された時に発火するイベント
  $(document).on('click', '.chat-group-user__btn--add', function(){
    //追加ボタンに記述したdataからuserのidを取得
    var id = $(this).attr('data-user-id');
    //追加ボタンに記述したdataからuserのnameを取得
    var name = $(this).attr('data-user-name');
    //取得したidとnameでbuildHTMLを適用する
    buildHTML(id, name);
    //同じuserを再度追加できないよう検索結果リストから削除
    $(this).parent().remove();
  });
  //グループメンバーリストの各userに設置した削除ボタンが押された時に発火するイベント
  $(document).on('click', '.js-remove-btn', function(){
    //削除したuserをグループメンバーリストから削除
    $(this).parent().remove();
  });
  //検索フォームに入力の度に発火するイベント
  $(".chat-group-form__input").on('keyup', function(){
    //検索フォームの入力内容を取得
    var input = $(this).val();
    //非同期通信の設定
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    //通信成功時の処理
    .done(function(users){
      //前の検索結果の削除
      $('#user-search-result').empty();
      //検索結果数が０ではなければ、
      if(users.length !== 0){
        //各userに対して、
        users.forEach(function(user){
          //appendUserを適用する
          appendUser(user);
        });
      }
      //検索結果数が０であれば、
      else{
        //appendNoUserに不一致メッセージを渡す
        appendNoUser("一致するユーザーはいません");
      }
    })
    //通信失敗時の処理
    .fail(function(){
      //検索失敗アラートを出す
      alert("検索に失敗しました");
    });
  });
});
