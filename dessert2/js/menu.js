$(function () {
    // menu栏颜色同步
    var $menuLink = $(".menu-link");
    var $span = $menuLink.find(".color-span");
    $.each($menuLink,function (i,n) {
        var $linkSpan = $(n).find(".click-link");
        var rgbColor  = $(n).find(".color-span").css("background-color");
        if($(n).hasClass("active")){
            $linkSpan.css("background-color",rgbColor);
            menuCartColor.changeColor(rgbColor);
        }
        n.onmouseover = function () {
            $linkSpan.css("background-color",rgbColor);
        }
        n.onmouseout = function () {
            if(!$(n).hasClass("active")){
                $linkSpan.css("background-color","transparent");
            }
        }
        n.addEventListener("click",function () {
            $menuLink.removeClass("active");
            $(n).addClass("active");
            menuCartColor.changeColor(rgbColor);
            menuProLiColor.changeColor();
            $menuLink.not($(n)).find(".click-link").css("background-color","transparent");
        })
    });

    //产品div栏的边框颜色
    menuProLiColor.changeColor();

    // 固定nav栏
    var headerNav = document.getElementsByClassName("nav")[0];
    var ad_bar = document.getElementById("ad_bar");
    var headerTopNum = headerNav.offsetTop;
    var $menuMain  = $(".menu-main");
    var $menuClassify = $menuMain.find(".classify");
    var classifyTopNum = $menuClassify.offset().top;
    var adBarTop = parseInt(getStyle(ad_bar,"marginTop"));
    window.onscroll = function () {
        if(scroll().top>=headerTopNum){
            headerNav.className = "nav fixed";
            ad_bar.style.marginTop = adBarTop+headerNav.offsetHeight+"px";
        }else{
            headerNav.className = "nav";
            ad_bar.style.marginTop = 0;
        }
        if(scroll().top>=classifyTopNum-headerNav.offsetHeight){
            $menuClassify.addClass("fixed");
        }else{
            $menuClassify.removeClass("fixed");
        }
    }

});
// 加入购物车a标签背景色
var menuCartColor = {
    $proCartA : $(".menu-pro-content .pro-cart>a"),
    changeColor : function (rgbColor) {
        $.each(menuCartColor.$proCartA,function (i,n) {
            n.style.backgroundColor = rgbColor;
        });
    }
};
//产品div栏的边框颜色
var menuProLiColor = {
    $menuProLi : $(".menu-pro-content li"),
    changeColor :function () {
        $.each(menuProLiColor.$menuProLi,function (i,n) {
            var rgbColor = menuProLiColor.$menuProLi.find(".pro-cart>a").css("background-color");
            n.onmouseover = function () {
                n.style.border = "1px solid "+rgbColor;
            };
            n.onmouseout =function () {
                n.style.border = "1px solid #eee";
            };
        });
    }
};


function  scroll() {
    if (window.pageYOffset != null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode == "CSS1Compat") {
        return {
            top: window.documentElement.scrollTop,
            left: window.documentElement.scrollLeft
        }
    } else {
        return {
            top: window.body.scrollTop,
            left: window.body.scrollLeft
        }
    }
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}