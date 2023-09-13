//종이 찢어지는 효과 
function synopsLanding() {
    if($(".fullsection.full2").removeClass("hide")){
        $("#synopsis .synops .landing .paper_filp").addClass("scale-up");
        $("#synopsis .synops .landing .paper_before").addClass("slide-bottom");
        $("#synopsis .synop_01").removeClass("landing");
        clearTimeout(times);
        var times = setTimeout(function(){ 
            $("#synopsis .synops .landing").fadeOut("fast");
        }, 1000);  
        synopsBills();
    }
}

//종이/돈 떨어지는 효과
function synopsBills(){
    // effect random 발생
    var falling = true;
    TweenLite.set("#falling", {perspective: 6000});
    TweenLite.set("#falling img", {xPercent: "-50%", yPercent: "-50%"});

    var total = 60;
    var synopsisCon = document.getElementById("falling"),	
        w = window.innerWidth+1920 , h = window.innerHeight;

    for (i=0; i<total; i++){ 
    var Div = document.createElement("div");
    TweenLite.set(Div, 
                {attr: {class: "dot"}, 
                x: R(0, w), y: R(-100, -50), z: R(-100, 100)});
    synopsisCon.appendChild(Div);
    fallingAnimm(Div);
    $(".dot").addClass("sib_first");  
    }
        
    // 이펙트 점점 줄이기 위해 클래스 할당
    for(j=0; j<(total/2); j++){ //1~30 (두 번째)
        $(".dot").eq(j).removeClass("sib_first").addClass("sib_second");  
    }
    for(k=0; k<(j/2); k++){ //1~15 (세 번째)
        $(".dot").eq(k).removeClass("sib_first").removeClass("sib_second").addClass("sib_third");
    }

    function fallingAnimm(elm){   
        TweenMax.to(elm, R(2, 6), {y: h + 500, ease: Linear.easeNone, repeat: -1, delay: -15});
        TweenMax.to(elm, R(1, 4), {x: "+=100", rotationZ: R(0, 180), repeat: -1, yoyo: true, ease: Sine.easeInOut});
        TweenMax.to(elm, R(2, 8), {rotationX: R(0, 360), rotationY: R(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5});
    }

    function R(min, max) {
        return min + Math.random()*(max - min)
    }

    var timeCalc = 2000;
    // timeCalc만큼 시간 지나면 effect fadeOut
    function fadeOutEffect(timeStts) {
        // effect 수 줄여 감
        setTimeout(function(){
            $(".dot.sib_first").fadeOut(500);
        }, timeCalc);
        setTimeout(function(){
            $(".dot.sib_second").fadeOut(500);
        }, timeCalc + 500);
        setTimeout(function(){
            $(".dot.sib_third").fadeOut(500);
        }, timeCalc + 1000);

        //최초 실행 후 effect remove
        if(timeStts == false){
            setTimeout(function(){
                $("#falling").removeClass("start");
            }, timeCalc + 1100);
        }
    } 
    fadeOutEffect();
    
    // .btn_left 클릭 시 종이를 돈으로 바꾸고 실행 
    $(".btn_set .btn_left").click(function(){
        if($("#falling").hasClass("start")){
            setTimeout(function(){
                $("#falling .dot").fadeIn(300);
                $("#falling .dot").removeClass("change");
            }, 300);
            fadeOutEffect(false);
        }
    });

    // .btn_right 클릭 시 종이를 돈으로 바꾸고 실행 
    $(".btn_set .btn_right").click(function(){
        if($("#falling").hasClass("start")){
            setTimeout(function(){
                $("#falling .dot").fadeIn(300);
                $("#falling .dot").addClass("change");
            }, 300);
            fadeOutEffect(false);
        }
    });
}


    
