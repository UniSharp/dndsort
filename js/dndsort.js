(function( $ ) {
  var list = $( "#sortable" );

  $.fn.sortjs = function (mode, options) {

    var settings = $.extend( {}, $.fn.sortjs.settings, options );

    if (mode == 'new') {
      sort_new(settings);
    } else if (mode == 'save') {
      sort_save(settings.submit_name);
    } else {
      sort_init(settings);
    }
  }

  $.fn.sortjs.settings = {
    // These are the defaults.
    data : [],
    submit_name : 'sort',
    labels : {
      new : '未命名的頻道',
      edit : '',
      delete : '刪除'
    },
    attrs : {
      li : {
        'class' : 'list-group-item'
      },
      btn_edit : {
        'style' : 'text-decoration: none;margin-right: 15px;',
        'class' : 'text-success glyphicon glyphicon-pencil'
      },
      btn_delete : {
        'class' : 'btn btn-xs btn-danger pull-right remove-new'
      },
    },
    render : sort_render
  };

  function sort_init(data) {
    data.render(data);

    init_edit();
    
    init_delete();
  }

  function sort_save(input_name) {
    var id_array = [];
    var channels = list.children('li');
    var content  = channels.children('span');

    for (var i = 0; i < channels.length; i++) {
      id_array.push({
        "id"   : channels[i].dataset.id,
        "name" : content[i].innerHTML
      });
    }
    id_array = JSON.stringify(id_array);

    input = $('<input />').attr({
      'type' : 'hidden',
      'name' : input_name,
      'value' : id_array
    });

    list.after(input);
  }

  function sort_render(data) {

    $.each(data.data, function(key, item){

      if (item.attr_edit == null) {
        var attr_edit = data.attrs.btn_edit;
      } else {
        var attr_edit = item.attr_edit;
      }

      if (item.attr_delete == null) {
        var attr_delete = data.attrs.btn_delete;
      } else {
        var attr_delete = item.attr_delete;
      }

      var attr_li = data.attrs.li;
      var id = item.id;
      var btn_edit = $('<a />')
        .attr(attr_edit)
        .html(data.labels.edit);
      var label = $('<span />').html(item.title);
      var btn_delete = $('<a />')
        .attr(attr_delete)
        .html(data.labels.delete);

      set_item(attr_li, id, btn_edit, label, btn_delete);
    });
  }

  function sort_new(data) {
    var attr_li = data.attrs.li;
    var id = 'new';
    var btn_edit = $('<a />')
      .attr(data.attrs.btn_edit)
      .html(data.labels.edit);
    var label = $('<span />').html(data.labels.new);
    var btn_delete = $('<a />')
      .attr(data.attrs.btn_delete)
      .html(data.labels.delete);

    set_item(attr_li, id, btn_edit, label, btn_delete);
  }

  //----新增頻道----
  function set_item(attr_li, id, btn_edit, label, btn_delete) {
    $('<li />').attr(attr_li)
      .attr('data-id', id)
      .append(btn_edit)
      .append(label)
      .append(btn_delete)
      .appendTo(list);
  }

  function init_edit() {
    //----修改頻道名稱----
    list.on('click', 'li a.text-success', function(){
      input_wake($(this).parent('li'));
    });

    //----修改頻道名稱----
    list.on('dblclick', 'li', function(){
      input_wake($(this));
    });

    //----完成修改名稱(滑鼠)----
    list.on('blur', 'li', function(){
      input_sleep($(this));
    });

    //----完成修改名稱(Enter)----
    list.on('keypress', 'li', function(e){
      if(e.which==13){
        input_sleep($(this));
      }
    });
  }

  function init_delete() {
    //----刪除未儲存的頻道----
    list.on('click', '.remove-new', function(){
      $(this).parent('li').remove();
    });
  }

  function input_wake(item) {
    $button = item.children('a');
    $button.removeClass('text-success');

    $field = item.children('span');
    var content = $field.text();
    $field.html('<input type="text" autofocus/>');
    $field.children('input').focus();
    $field.children('input').val(content);
  };

  function input_sleep(item) {
    $button = item.children('a');
    $button.addClass('text-success');;

    $field = item.children('span');
    var content = $field.children('input').val();
    $field.html(content);
  };
})( jQuery );
