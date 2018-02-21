$(function(){
  var groupMember = $('#chat-group-users');
  var searchList = $('#user-search-result');
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
    groupMember.append(html);
  }
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix" data-user-id="${ user.id }" data-user-name="${ user.name }">
                  <p class="chat-group-user__name">
                    ${ user.name }
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    searchList.append(html);
  }
  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                  ${ user }
                </div>`
    searchList.append(html);
  }

  $(document).on('click', '.chat-group-user__btn--add', function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    buildHTML(id, name);
    $(this).parent().remove();
  });
  $(document).on('click', '.js-remove-btn', function(){
    $(this).parent().remove();
  });

  $(".chat-group-form__input").on('keyup', function(e){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert("検索に失敗しました");
    });
  });
});
