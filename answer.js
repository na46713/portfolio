$(function(){
$(".mainSite").css("display", "none");

setTimeout(function() {
    $('.wrapper').fadeOut();
	}, 3800);
});

$(function(){
    $(".mainSite").css({opacity:'0'});
    setTimeout(function(){
    $(".mainSite").css("display", "block");
    $(".mainSite").stop().animate({opacity:'1'},1000);//1秒かけてコンテンツを表示
    },3800);
});

