$(function(){
    castMaskParallax();
    $("#fullpage .full3 #cast_list .box").each(function(){ //thumbnails 마다
        $(this).click(function(){ //클릭 시 이벤트 실행
            var currentCast = $(this);
            castShowDetail(currentCast); 
        });
    });

    $("#fullpage .full3 #cast_list").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: true,
        dots: true,
        prevArrow:"<i class='far fa-chevron-left slick-prev'></i>",
        nextArrow:"<i class='far fa-chevron-right slick-next'></i>",
        autoplay: false,
        focusOnSelect: true
    });

    $( ".full3 .glitch_con .glitch-img" ).mgGlitch({
        // set 'true' to stop the plugin
        destroy: false,
    
        // set 'false' to stop glitching
        glitch: true, 
    
        // set 'false' to stop scaling
        scale: true, 
    
        // set 'false' to stop glitch blending
        blend : true, 
    
        // CSS blend-mode property
        // normal
        // multiply
        // screen 
        // overlay
        // darken
        // lighten
        // color-dodge
        // color-burn
        // difference 
        // exclusion
        // hue
        // saturation  
        // color
        // luminosity
        blendModeType : 'hue', 
    
        // set min time for glitch 1 elem
        glitch1TimeMin : 600, 
    
        // set max time for glitch 1 elem
        glitch1TimeMax : 900, 
    
        // set min time for glitch 2 elem
        glitch2TimeMin : 30, 
    
        // set max time for glitch 2 elem
        glitch2TimeMax : 115, 
    
        // z-index
        zIndexStart : 1
    });
    
});
   
//mask parallax effect
function castMaskParallax(){
    var currentX = '';
    var currentY = '';
    var movementConstant = 0.015;
    $("#cast").mousemove(function(e) {
        (currentX == '') ? currentX = e.pageX : '';
        //X 좌표값 보정
        var xdiff = e.pageX - currentX;
        currentX = e.pageX;

        //Y 좌표값 보정
        (currentY == '') ? currentY = e.pageY : '';
        var ydiff = e.pageY - currentY;
        currentY = e.pageY;

        $("#cast .mask_con").each(function(i, el) {
            var movementX = (i + 1) * (xdiff * movementConstant);
            var movementY = (i + 1) * (ydiff * movementConstant);
            var newX = $(el).position().left + movementX;
            var newY = $(el).position().top + movementY;
            $(el).css("left", newX + "px");
            $(el).css("top", newY + "px");
        });
        $("#cast .mask_con").mousemove(function(){
            castLanding();
        });
    });
}

//mask take off
function castLanding(){
    $("#cast .mask_con").draggable({axis:"y"});
    $("#cast .mask_con").unbind("mousemove").bind("mousemove", function(e) {
        var offsetYOrigin = $("#cast .mask_con").offset().top;
        var offsetY = parseInt(offsetYOrigin);
        if(offsetY > 250 || offsetY < -100) {
            $("#cast .mask_con").fadeOut(200);
            landingDone();
        }
    });

    //랜딩 페이지 끝나면 애니메이션 추가 후 클래스 지우기
    function landingDone(){
        $("#cast .landing").addClass("done");
        setTimeout(function(){
            $("#cast .landing").remove();
        }, 1500);
    }
}

function castShowDetail(currentCast){
    //==== show_detail area start ====
    $(".full3").addClass("show_detail");
    $("#fullpage .full3 .main_con #cast_detail").addClass("detail_show");
    
    //currentCast로 데이터 교체 
    var $box = $(currentCast),
        title = $box.find("h2").text()
        subTitle = $box.find("h3").text(),
        desc = $box.find("h4").html(),
        imgMen = $(currentCast).children(".men").attr("src");
        imgBg =  $(currentCast).children(".bg").attr("src");

    $("#fullpage .full3 #cast_detail .title_con.detail h2").text(title);
    $("#fullpage .full3 #cast_detail .title_con.detail h3").text(subTitle);
    $("#fullpage .full3 #cast_detail .title_con.detail h4").html(desc);
    $("#fullpage .full3 #cast_detail .box.detail .men").attr("src", imgMen);
    $("#fullpage .full3 #cast_detail .box.detail .bg").attr("src", imgBg);
    
    $("#fullpage .full3 .main_con #cast_detail.detail_show").fadeIn(100);

    //==== show_detail area done ====
    //여백이나 x 버튼 누르면 detail 클래스 빼기 
    $("#fullpage .full3 .bg_typo, #fullpage .full3 .main_con #cast_detail i").click(function(){
        console.log("dfdfdf");
        $("#fullpage .full3 .main_con #cast_detail.detail_show").fadeOut(200);
        setTimeout(function(){
            $("#fullpage .full3").removeClass("show_detail");
        }, 200);
    });
}
