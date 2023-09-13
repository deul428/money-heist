var userAgent = navigator.userAgent.toLowerCase();
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

$.fn.preload = function(){
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
var preload_path = "img/"; 
$([ preload_path+"header/logo_spain.svg",
    preload_path+"ui/ci_netflix_simple.svg",

    preload_path+"synopsis/bg_paper.png",
    preload_path+"synopsis/bg_paper_before.jpg",
    preload_path+"synopsis/bg_professor.png",
    preload_path+"synopsis/bg_heists.png",
    preload_path+"synopsis/object_gun.png",
    preload_path+"synopsis/object_pen.png",
    preload_path+"synopsis/effect/paper_flip.png",
    preload_path+"synopsis/effect/bill_01.png",
    preload_path+"synopsis/effect/bill_02.png",
    preload_path+"synopsis/effect/bill_03.png",
    preload_path+"synopsis/effect/bill_04.png",
    preload_path+"synopsis/effect/bill_05.png",
    preload_path+"synopsis/effect/bill_06.png",
    preload_path+"synopsis/effect/paper_01.png",
    preload_path+"synopsis/effect/paper_02.png",
    preload_path+"synopsis/effect/paper_03.png",
    preload_path+"synopsis/effect/paper_04.png",
    preload_path+"synopsis/effect/paper_05.png",
    preload_path+"synopsis/effect/paper_06.png",

    preload_path+"cast/bg_paper_detail.jpg",

    preload_path+"cast/landing/mouse.png",
    preload_path+"cast/landing/landing_mask.png",
    preload_path+"cast/landing/landing_bg.jpg",
    preload_path+"cast/men/mask_tokyo.png",
    preload_path+"cast/bg/bg_tokyo.jpg",
    preload_path+"cast/men/mask_professor.png",
    preload_path+"cast/bg/bg_professor.jpg",
    preload_path+"cast/men/mask_berlin.png",
    preload_path+"cast/bg/bg_berlin.jpg",
    preload_path+"cast/men/mask_denver.png",
    preload_path+"cast/bg/bg_denver.jpg",
    preload_path+"cast/men/mask_nairobi.png",
    preload_path+"cast/bg/bg_nairobi.jpg",
    preload_path+"cast/men/mask_helsinki.png",
    preload_path+"cast/bg/bg_helsinki.jpg",
    preload_path+"cast/men/mask_rio.png",
    preload_path+"cast/bg/bg_rio.jpg",
    preload_path+"cast/men/mask_estocolmo.png",
    preload_path+"cast/bg/bg_estocolmo.jpg",
    preload_path+"cast/men/mask_lisboa.png",
    preload_path+"cast/bg/bg_lisboa.jpg",
    preload_path+"cast/men/mask_palermo.png",
    preload_path+"cast/bg/bg_palermo.jpg",
    preload_path+"cast/men/mask_marsella.png",
    preload_path+"cast/bg/bg_marsella.jpg",

    preload_path+"trailers/thumbnail_02.jpg",
    preload_path+"trailers/thumbnail_03.jpg",
    preload_path+"trailers/thumbnail_04.jpg",
    preload_path+"trailers/thumbnail_05.jpg",

    preload_path+"about/ci_netflix.png",
    preload_path+"about/bg.jpg",
    preload_path+"about/effect_noise.jpg",
]).preload();

var change_speed = 750;
// var times; %%%%
var release_times, times;
// 사이드 퀵버튼 클릭 이동
function quickClick(){
    $(".quick li, ul.nav_con li, #header .logo_con").click(function(){
        var gnbindex = $(this).index();
        var length=0;
        var currendIndex = gnbindex + 1;
        for(var i=1; i<(currendIndex); i++){
            length+=$(".full"+i).height();
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false; //화면전환 중에 다른 화면 전환 불가
        $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
        $("ul.nav_con li").removeClass("on").eq(gnbindex).addClass("on");

        $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
        $(".pagination b").text(currendIndex);
        
        if (gnbindex == 1) {
            $(".quick li").addClass('synopsDot');
        } else {
            $(".quick li").removeClass('synopsDot');
        }
        removeHide(currendIndex);

        return false;
    });
}

function fullset(){
    var pageindex = $("#fullpage > .fullsection").size(); //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);
    for(var i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
    }
    $("#fullpage .quick ul li:first-child, #header ul.nav_con li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
    
    /*--------------------------------------------------------*/
    $(window).on("mousewheel DOMMouseScroll", function(event){     
        // clearTimeout(times); %%
        // times = setTimeout(function(){                 %%
        //     $("body").removeClass("locked"); % %
        // }, change_speed);      %%
        clearTimeout(times);                //@@@@@
        times = setTimeout(function(){      //@@@@@          
            $("body").removeClass("locked");//@@@@@
        }, change_speed);                   //@@@@@
        event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
    /*--------------------------------------------------------*/
            
        var page = $(".quick ul li.on");
        var nav = $("ul.nav_con li.on");
        //alert(page.index()+1);  // 현재 on 되어있는 페이지 번호
        if($("body").find("#fullpage:animated").length >= 1) return false;
        var before = page.index();
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {//마우스 휠을 위로

            if(page.index() >= 0){
                page.prev().addClass("on").siblings(".on").removeClass("on");
                nav.prev().addClass("on").siblings(".on").removeClass("on");
            }//퀵버튼옮기기
            var pagelength=0;
            for(var i=1; i<(before); i++){
                pagelength += $(".full"+i).height();
            }
            if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                page = page.index()-1;
                $("#fullpage").animate({"top": -pagelength + "px"}, change_speed, "easeInOutQuint");
                $(".pagination b").text(page+1);
                removeHide(page+1);
            }else{
                //alert("첫번째페이지 입니다.");
            }	


            //휠 내릴 때 페이지 인덱스가 2이면(synopsis) dots 컬러 바꿔라 
            if (before == 2) {
                // console.log("2Page");
                $(".quick li").addClass('synopsDot');
            } else{
                $(".quick li").removeClass('synopsDot');
            }
        }else{ // 마우스 휠을 아래로	
            var nextPage = parseInt(page.index()+1); //다음페이지번호
            var lastPageNum = parseInt($(".quick ul li").size()); //마지막 페이지번호
            //현재페이지번호 <= (마지막 페이지 번호 - 1)
            //이럴때 퀵버튼옮기기
            if(page.index() <= $(".quick ul li").size()-1){ 
                page.next().addClass("on").siblings(".on").removeClass("on");
                nav.next().addClass("on").siblings(".on").removeClass("on");
            }
            if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                var pagelength=0;
                for(var i = 1; i<(nextPage+1); i++){ 
                    //총 페이지 길이 구하기
                    //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                    pagelength += $(".full"+i).height();
                }
                $("#fullpage").animate({"top": -pagelength + "px"}, change_speed, "easeInOutQuint");
                $(".pagination b").text(nextPage+1);
                removeHide(nextPage+1);
                if (nextPage == 4) {
                    console.log(nextPage);
                    aboutLanding();
                }
            }else{ // 현재 마지막 페이지 일때는
                //alert("마지막 페이지 입니다!");
            }
            
            //휠 내릴 때 페이지 인덱스가 0이면(synopsis) dots 컬러 바꿔라 
            if (before == 0) {
                // console.log("2Page");
                $(".quick li").addClass('synopsDot');
            } else{
                $(".quick li").removeClass('synopsDot');
            }
        } 
            
    /*--------------------------------------------------------*/ 
            
        }else{
            return false;
        }
        clearTimeout(release_times);            //@@@@@
        release_times = setTimeout(function(){  //@@@@@              
            $("body").removeClass("locked");    //@@@@@
        }, change_speed);                       //@@@@@

    /*--------------------------------------------------------*/
    });
    $(window).resize(function(){ 
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick ul li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){ 
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }

        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        fullSubSizing();
    });
}

//화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거
function removeHide(i){
    $(".fullsection.full"+i).removeClass("hide");
    synopsLanding();
}

function fullSubSizing(){
    var prnts_w;
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        var prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height:prnts_h});
    });

    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });

    $(".btn_left, .btn_right").each(function(){
        $(this).click(function(){
            var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            // alert(sub_counter);//@@@@@@@@@@@@@@@@@           
            var move_w = prnts_w;
            if(!$(this).hasClass("btn_left")){
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
                    sub_counter +=1;
                }else{
                    $(".btn_right").disabled = true;
                }
            }else{
                if(sub_counter > 1){
                    sub_counter -=1;
                }else{
                    $(".btn_left").disabled = true;
                }
            }
            move_w = move_w * (sub_counter-1) * -1;                
            $(this).parents(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter);//@@@@@@@@@@@@@@@@@
        });
    });  
}


var videoTime;
function trailersThumb(){
    var srcKey, episode, nowThumb;
    $("#trailers .thumbnail_con .thumbnails").each(function(){ //thumbnails 마다
        $(this).click(function(){ //클릭할 때 실행하라
            $(this).parents(".thumbnail_con").find(".thumbnails").removeClass("selected");
            $(this).addClass("selected"); //현재 눌린 thumbnails에 selected 클래스 할당

            //조건문에 따른 영상 길이, 해당 썸네일 번호, .title_con 안에 들어갈 html를 각각
            //videoTime, nowThumb, episode에 저장
            if ($(this).hasClass("thumbnail_01")){
                srcKey = "HH01y9Pe0TI";
                videoTime = 120000;
                nowThumb = 1;
                episode = 
                    "<h3>EPISODE 13</h3>" +
                    "<h2><span>part</span><span>1</span></h2>" +
                    "<h4>Eight criminals gathered by an unidentified &#145;professor&#146; join the professor&#146;s operation as they spend months lodging and lodging to rob the Madrid Mint at a hunting ground in Toledo. They call each other the names of cities, and during this period, they learn shooting training and psychological tactics, operational overviews, and medicine according to the professor&#146;s careful plan.</h4>";
            } else if ($(this).hasClass("thumbnail_02")){
                srcKey = "ZAXA1DV4dtI"; 
                videoTime = 97000;
                nowThumb = 2;
                episode = 
                    "<h3>EPISODE 9</h3>" +
                    "<h2><span>part</span><span>2</span></h2>" +
                    "<h4>The professor had a plan to print 2.4 billion euros for a long-term occupation, not just for the mint. They successfully occupy the Mint and the plan goes smoothly. The professor is in charge of external support at an old warehouse around the Mint. The media and police acted as the professor said in advance, and they played with the police. However, as time goes by, the plan goes awry due to the rebellion and escape of the characters. It is about the robbery of the Mint in season 1.</h4>";
            } else if ($(this).hasClass("thumbnail_03")){
                srcKey = "TFJwUwnShnA";
                videoTime = 123000; 
                nowThumb = 3;
                episode = 
                    "<h3>EPISODE 8</h3>" +
                    "<h2><span>part</span><span>3</span></h2>" +
                    "<h4>Professors and robbers managed to escape Spanish territorial waters with 980 million euros they printed. They will cross the Atlantic Ocean and be scattered in groups of two in safe houses until the statute of limitations expires. But one day, about two years later, Leo is arrested for secretly using a satellite phone. Tokyo, which managed to get rid of the police, calls the professor, and the professor convenes the robbers again. Bogota, Marseille, Stockholm, Lisbon and Palermo join together, and this time the professor decides to rob the Spanish National Reserve of 90 tons of gold stored 48 meters underground.</h4>";
            } else if ($(this).hasClass("thumbnail_04")){
                srcKey = "p_PJbmrX4uk";
                videoTime = 125000; 
                nowThumb = 4;
                episode = 
                    "<h3>EPISODE 8</h3>" +
                    "<h2><span>part</span><span>4</span></h2>" +
                    "<h4>The professor&#146;s plan began to crumble. The Spanish banks are full of enemies. In a completely isolated siege, the team members whose lives were at stake. But we can&#146;t end the game like this.</h4>";
            } else {
                srcKey = "1FhmnB6SwBc";
                videoTime = 97000; 
                nowThumb = 5;
                episode = 
                    "<h3>EPISODE 10</h3>" +
                    "<h2><span>part</span><span>5</span></h2>" +
                    "<h4>Can they win this war? Robbers trapped in Spanish banks for over 100 hours. Their elaborate plans were changed and the professor was caught in an inescapable trap. Worst of all, the army has just arrived.</h4>";
            }

            var main = $("#trailers .main_con"); 

            //현재 .current_con을 삭제해 html 초기화 
            $("#trailers .current_con").remove();

            //.main_con에 .current_con 추가
            main.append(
                "<div class='current_con current" + nowThumb + "'>" +
                    "<div class='video_con'>" +
                        "<iframe id='video' type='text/html' src='https://www.youtube.com/embed/" + srcKey + "?autoplay=1&mute=1&rel=0&showinfo=0&controls=0&loop=1&disablekb=1&vq=highres' frameborder='0'></iframe>" +
                    "</div>" +
                    "<div class='title_con'>" +
                        episode +
                    "</div>" +
                "</div>"
            ); 

            $("#trailers .main_con .current_con .title_con").css({"display":"none"});
            $("#trailers .main_con .current_con .title_con").fadeToggle( 1000 );

            //.default_con 삭제
            $("#trailers .default_con").remove();

            // console.log("videoTime after:: ", videoTime,
            //             "\nsrcKey after:: ", srcKey);
            trailersVideoReload(srcKey, "click", nowThumb, videoTime);
        });
    });

    $("#trailers .thumbnail_con").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        pauseOnFocus: true,  //마우스 포커스 시 슬라이드 멈춤 -default:true
        pauseOnHover: true,
        focusOnSelect: true
    });
}

//영상 자동 새로고침 함수
function trailersVideoReload(keyData, condition, condition_no, playTime){
    console.log("====== video Reload function start ======");
    console.log(
        "keyData:: ", keyData, 
        "\ncondition:: ", condition + condition_no, 
        "\nplayTime:: ", playTime);

    keyData = keyData;
    //==================== 새로고침 ====================
    clearInterval(videoInterval);

    function videoChange() {
        $("#trailers #video").attr("src", $("#trailers #video").attr("src"));       
    }
    var videoInterval = setInterval(videoChange, playTime);
}

function aboutLanding(){
    console.log("show about");
    $(".fullsection.full5 .width_con h2").addClass("slide-top");
    $(".fullsection.full5 .width_con img").addClass("slide-top-02");
    $(".fullsection.full5 .width_con button").addClass("slide-top-03");
}

$(function(){
    fullset();
    quickClick();
    fullSubSizing();//@@@@@@@@@@@@@@@@
    trailersThumb();
    videoTime = 120000;  //trailers 기본값(첫 번째 영상 길이) 
    trailersVideoReload('', "default", '', videoTime);
});

