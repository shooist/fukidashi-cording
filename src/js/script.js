// スムーススクロール
$(function(){
  $('a[href^="#"]').click(function(){
    //スクロールのスピード
    var speed = 800;
    //リンク元を取得
    var href= jQuery(this).attr("href");
    //リンク先を取得
    var target = jQuery(href == "#" || href == "" ? 'html' : href);
    //リンク先までの距離を取得
    var position = target.offset().top;
    //スムーススクロール
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});

// header, FirstView初期表示
$(window).on("load", function () {
  setTimeout(function() {
    $(".js-firstView-01").addClass("active");
    setTimeout(function() {
      $(".js-firstView-02").addClass("active");
    }, 2000);
  }, 1000);
});