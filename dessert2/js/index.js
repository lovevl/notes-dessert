


var $menuClick = $(".menu .menu-pro .menu-nav a:not(:last-child)");
var $menuContentParent = $(".menu .pro-content");
var $menuContent = $menuContentParent.children("div");
var t = undefined;
$.each($menuClick,function (i,n) {
    var $n = $(n);
    $n.on("click",function(){
        var $menuContentActive = $menuContentParent.children(".active");
        var opa = 1 / 80;
        var baseopa = 0;
        var targetopa = 1;
        var flag = false;
        $menuClick.removeClass("active");
        $menuClick.eq(i).addClass("active");
        $menuContent.eq(i).show();
        t = window.setInterval(function(){
            targetopa = targetopa - opa;
            var b = $menuContentActive[0];
            b.style.opacity = targetopa;
            if(targetopa <= 0){
                $menuContentActive.removeClass("active");
                b.style.opacity = 0;
                $menuContentActive.hide();
                flag = true;
            }
            baseopa = baseopa + opa;
            var $m = $menuContent.eq(i);
            var m = $m[0];
            m.style.opacity = baseopa;
            flag = false;
            if(baseopa >= 1){
                $m.addClass("active");
                m.style.opacity = 1;
                flag = true;
            }
            if(flag){
                window.clearInterval(t);
            }
        },1);
        return false;
    });
});
$(function () {
var lifeImgBox = document.getElementsByClassName("life-pic-box");
var lifeImg = document.getElementById("sliderImgId");
var num = 0;
imgT = setInterval(sliderImg,1);

    lifeImgBox[0].onmouseover = function(){
        clearInterval(imgT);
    }
    lifeImgBox[0].onmouseout = function () {
        imgT = setInterval(sliderImg,1);
    }

function sliderImg(){
    num++;
    if(num<=1100){
        lifeImg.style.left = -num+"px";
    }else{
        lifeImg.style.left = 0;
        num = 0;
    }
}
});


