(function($){
  
  // 表单聚焦、失焦效果
  $(".list .item").focus(function(){
  	$(this).addClass('focus');
  }).blur(function(){
  	$(this).removeClass('focus');
  })

})(jQuery)