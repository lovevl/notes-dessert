function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

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

function client() {
    if(window.innerWidth != null)  // ie9 +  最新浏览器
    {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    else if(document.compatMode === "CSS1Compat")  // 标准浏览器
    {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {   // 怪异浏览器
        width: document.body.clientWidth,
        height: document.body.clientHeight

    }
}

function  animate(obj,json,time) {
    clearInterval(obj.timer);
    if(time==undefined)time=10;
    obj.timer = setInterval(function(){
        var flag = true;
        for(var attr in json){
            var leader = 0;
            var target = json[attr];
            if(typeof target != Number)target = parseInt(target);
            if("opacity" == attr){
                leader = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                target = json[attr]*100;
            }else{
                leader = parseInt(getStyle(obj,attr));
            }
            leader = leader + (target - leader)/10;
            leader = target - leader > 0 ? Math.ceil(leader) : Math.floor(leader);
            if("opacity" == attr){
                if("opacity" in obj.style){
                    if(leader>90){
                        obj.style.opacity = 1;
                    }else if(leader<10){
                        obj.style.opacity = 0;
                    }else{
                        obj.style.opacity = leader/100;
                    }
                }else{
                    obj.style.filter = "alpha(opacity="+leader+")";
                }
            }else if("zIndex" == attr){
                obj.style.zIndex = json[attr];
            }else{
                obj.style[attr] = leader + "px";
            }
            if(leader != target){
                flag = false;
            }
        }
        if(flag)clearInterval(obj.timer);

    },time);
}