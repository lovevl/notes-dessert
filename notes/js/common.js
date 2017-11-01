var scrollBox = document.querySelector(".scrollbox");
window.onscroll = function () {
    scrollNum = scroll().top;
    if(scrollNum>0 && getStyle(scrollBox,"opacity") != 1){
        animate(scrollBox,{opacity:1},50);
    }else if(scrollNum == 0){
        animate(scrollBox,{opacity:0},50);
    }
}
var GetboxCodeProp = function(obj){
    this.childP = obj.querySelectorAll('P');
    this.boxHeight = parseInt(getStyle(obj,"height"));
}
var GetorderNum = function(obj){
    this.elemt = obj.querySelector(".order-number");
    this.createChildP = function(index){
        var pNum = document.createElement("p");
        pNum.innerHTML = index + ".";
        this.elemt.appendChild(pNum);
    };
    this.init = function (height) {
        if(this.elemt == null){
            this.elemt = document.createElement("div");
            this.elemt.className = "order-number";
            obj.insertBefore(this.elemt,null);
        }
        this.elemt.style.height = height + "px";
    }
}
var createNum = function (selector) {
    var boxCodes = document.querySelectorAll(selector);
    for(var i = 0; i < boxCodes.length ; i++){
        var boxProperty = new GetboxCodeProp(boxCodes[i]);
        var orderNum = new GetorderNum(boxCodes[i]);
        orderNum.init(boxProperty.boxHeight);
        for(var j = 0; j < boxProperty.childP.length; j++){
            orderNum.createChildP(j+1);
        }
    }
}
scrollBox.addEventListener("click", function () {
    scrollFun(scrollNum);
});
var scrollFun = function (topNum) {
    var leader = topNum;
    var target = 0;
    scrollTime = window.setInterval(function () {
        leader = leader + (target-leader)/10;
        console.log(leader);
        window.scrollTo(0,leader);
        if(leader<=2){
            window.scrollTo(0,0);
            clearInterval(scrollTime);
        }
    },30);
}

function catalogInit(className) {
    var catalog = document.querySelector(className);
    var catalogBox =  catalog.querySelector(".catalog-box");
    var cataBoxScr = catalogBox.querySelector(".catalog-box-scroll");
    if(cataBoxScr.scrollHeight > cataBoxScr.offsetHeight){
        cataBoxScr.style.overflowY = "scroll";
    }
    catalog.onmouseover = function () {
        catalog.style.left = cataBoxScr.offsetWidth + "px";
    }
    catalog.onmouseout = function () {
        catalog.style.left = 0;
    }
    // document.addEventListener("touchstart",function (event) {
    //     var event = event || window.event;
    //     var target = event.target ? event.target : event.srcElement;
    //     if(!$(target).is(".catalog")){
    //         catalog.style.left = 0;
    //         catalog.style.background = "url(img/arrow_right.png) no-repeat center center";
    //         catalog.style.backgroundSize = "50px 40px";
    //         catalog.style.backgroundColor = "#5cb85c";
    //     }
    // });
}
