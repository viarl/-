var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
//获取相关CSS属性
var getCss = function(o,key){
    return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

//拖拽的实现
var startDrag = function(bar, target, callback){
    if(getCss(target, "left") !== "auto"){
        params.left = getCss(target, "left");
    }
    if(getCss(target, "top") !== "auto"){
        params.top = getCss(target, "top");
    }
    //o是移动对象
    bar.onmousedown = function(event){
        params.flag = true;
        if(!event){
            event = window.event;
            //防止IE文字选中
            bar.onselectstart = function(){
                return false;
            }
        }
        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
    };
    document.onmouseup = function(){
        params.flag = false;
        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function(event){
        var e = event ? event: window.event;
        if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            target.style.left = parseInt(params.left) + disX + "px";
            target.style.top = parseInt(params.top) + disY + "px";
        }

        if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
        }
    }
};
startDrag($("#h")[0],$("#chatMain")[0]);
function ChatHidden(){$("#chatMain").css("display","none");
$("#a_news").css("display","block");
}
function ChatShow(){$("#chatMain").css("display","block");
$("#a_news").css("display","none");
}
function ChatClose(){$("#chatMain").css("display","none");
$("[name='user_a_all']").hide();
$("#chatstranger").find("tr[name='user_a_all']").remove();
$("[name='chatTbody']").hide();
$("#ChatValue").val("");
$("#a_news").css("display","none");
}

function sendtext(){
	
	 var toname=$("#chatTitle").text();
	 var name=window.frames[0].frames["leftFrame"].$("#user_label").text();
	 var v = $("#ChatValue")[0];
	    if (v.value.length>0){
	      var msg="Text:"+toname+"_"+v.value;
	      if(typeof ws != "undefined") 
			  send(msg);
			else
			  window.frames[0].frames["leftFrame"].send(msg);
	     	    	
	      var text=$("#chatText");
	      var tbody=document.getElementById("tbody_"+toname);
	      if(tbody==null){	    	  	    	  
	    	  tbody=document.createElement("tbody");
	    	  tbody.id="tbody_"+toname;
	    	  $(tbody).attr("name","chatTbody");
	      }	      	        
	      var tr=document.createElement("tr");						
		  var td=document.createElement("td");
		  var td2=document.createElement("td");
		  var td3=document.createElement("td");
		  $(td2).attr("align","right");
	      
		  td2.innerHTML="<div class='commentR'>"+v.value+"</div>";
		  td3.innerHTML="<img src='"+window.frames[0].frames["leftFrame"].$("#photo").attr("src")+"'>";
		  
		  tr.appendChild(td);
		  tr.appendChild(td2);
		  tr.appendChild(td3);
		  tbody.appendChild(tr);
		  text[0].appendChild(tbody);
		  
		  scrollBot();
		  $("#ChatValue").focus();
	      v.value='';
	    }

}
