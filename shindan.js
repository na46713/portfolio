$(function(){
   $('a[href^=#]').click(function() {
      var speed = 600;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});
$(function(){
    h = $(window).height();
    h = h-30;
    $(".question").css("min-height", h + "px");
    $(".answerList .box").css("min-height", h + "px");
    
});
function show(idName){ 
    $("#" + idName).show();
}

