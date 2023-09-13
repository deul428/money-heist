var userAgent=navigator.userAgent.toLowerCase();
if(userAgent.indexOf('edge')>-1){
    $("html").addClass("edge");
}else if(userAgent.indexOf('whale')>-1){
    $("html").addClass("whale");
}else if(userAgent.indexOf('chrome')>-1){
    $("html").addClass("chrome");
}else if(userAgent.indexOf('firefox')>-1){
    $("html").addClass("firefox");
}else{
    $("html").addClass("ie");
}

$(function(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 2000,'easeInOutCubic');
    });});
/*------------------------------------------------------------------*/
$(function(){
    $(window).scroll(function(){
        if($("#visual").height() / 2  > $(this).scrollTop()){
            $("#about").removeClass("view")
        }else{
            $("#about").addClass("view")
        }
        if($("#about").offset().top > $(this).scrollTop()){
            $("#skill").removeClass("view")
        }else{
            $("#skill").addClass("view")
        }
        if($("#skill").offset().top > $(this).scrollTop()){
            $("#portfolio").removeClass("view")
        }else{
            $("#portfolio").addClass("view")
        }
        if($("#portfolio").offset().top > $(this).scrollTop()){
            $("#contact").removeClass("view")
        }else{
            $("#contact").addClass("view")
        }
    });
});
/*------------------------------------------------------------------*/
$(window).on('load', function(){
    $("html, body").animate({scrollTop: 0},1);
});
/*------------------------------------------------------------------*/
$(function(){
        $(".main_img").click(function(){   
            var place = $(this).attr("data-place");
            var img_count = $(this).attr("data-img-count");
            var selected = "";
            $(".gallery .list, .gallery .viewer").html("");    
            $(".gallery .viewer").append("<img src='img/gallery/img_"+place+"_01.jpg'>");
            for(i=1; i<=img_count; i++){
                if(i==1){
                    selected = "selected"
                }else{
                    selected = ""
                }
                $(".gallery .list").append("<img class='"+selected+"' src='img/gallery/img_"+place+"_0"+i+".jpg'>");
            }
            $("body, .gallery_cover, .gallery").addClass("on");//모달창 켜짐
        });
    });
    $(document).on("click",".gallery .list img",function(){//모달창 켜진후 설정
        $(".gallery .list img").removeClass("selected");//선택된 사진 지우고
        $(this).addClass("selected");//새로 선택한 사진올리기
        var src= $(this).attr("src");//소스 가져오는 바구니
        $(".gallery .viewer").fadeOut(100,function(){//내려오는값
            $(this).fadeIn(100).find("img").attr("src",src);//올라가는 값
        });
    });
$(function(){
    $(".gallery button").click(function(){//클릭시 실행
        $("body, .gallery_cover, .gallery").removeClass("on");//모달창 닫기
    });
});