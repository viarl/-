function LorS(){
   if($("#label1").text()=="登录/注册"){ 
      parent.top.ShowDiv();
      parent.top.$("#username").focus();
   }
   else{
      var un=$("#label1").text().substring(3);
      parent.top.intemInfo(un);    
   }
}

$("body").bind("click",function(e){ 
	var target = $(e.target); 
	var item=window.top.$("#itemInfo");
	var finfo=window.top.$("#fInfo");
    var new_div1=window.parent.frames["leftFrame"].$("#newf_div1");
    var room_div=window.top.$("#room_div");
	var friend=window.top.$("#friend");
	var pwd=window.top.$("#pwd_div");
	if(item.css("display")=="block"){
	   if(target.closest(".itemInfo_content").length ==0) {
		  item.css("display","none"); 
		   var file = window.top.$("#iupload");
             file.after(file.clone().val("")); 
             file.remove(); 
		  window.top.closeUpdate();
		  } 
	}else if(finfo.css("display")=="block"){
	   if(target.closest(".fInfo_content").length ==0){
	      finfo.css("display","none");
	      window.top.$("#yorn").text("删除好友");
	      }
	}else if(new_div1.css("display")=="block"){
	   if(target.closest(".new_div").length ==0 && target.closest(".ts").length ==0){
	      new_div1.css("display","none");
	      }
	}else if(room_div.css("display")=="block"){
	   if(target.closest(".room_div").length ==0)
	      room_div.css("display","none");	
	}else if(friend.css("display")=="block"){
			    if((target.closest(".friends").length ==0&&target.closest(".friend_outline").length==0)||
			       (target.closest(".friends").length ==0&&target.closest(".friend_online").length==0)){
			       friend.css("display","none");
			      }		
	}else if(pwd.css("display")=="block"){
	    if(target.closest(".pwd").length ==0){
		       pwd.css("display","none");
		      }		
    }     
	}) ;
