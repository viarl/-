$("body").bind("click",function(e){ 
	var target = $(e.target); 
	var item=window.top.$("#itemInfo");
	var finfo=window.top.$("#fInfo");
	var new_div1=window.parent.frames["leftFrame"].$("#newf_div1");
	var room_div=window.top.$("#room_div");
	var friend=window.top.$("#friend");
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
	}   
	}) ;

$(function(){
	selectUser(1);
	$("#bottom").css("display","block");
});
function lastPage(){
	var page=$("#page").val();
	if(page>1)
		selectUser(parseInt(page)-1);
}
function nextPage(){
	var page=$("#page").val();
	var total=$("#total").text();
	if(page<total)
		selectUser(parseInt(page)+1);
}
function endPage(){
	var total=$("#total").text();
	selectUser(total);
}
function selectUser(n){
	
	var username=$("#username").val();
	var nick=$("#nick").val();
	var tip=$("#tip").val();
	var lock=$("#lock").val();
	if(tip=="")
		tip=0;
	
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/QueryUserList',
		dataType : 'json',
		data : {"username" : username,"nickname" : nick,"tip":tip,"lock":lock,"page":n},
		success : function(data) {
			var d=data.list;
			var total=data.total;
			var tbody=$("#user-tbody");
			tbody.html("");			
			for(var i=0;i<d.length;i++){		

				var tr=document.createElement("tr");
				$(tr).css("height","30px");
				
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				var td3=document.createElement("td");
				var td4=document.createElement("td");
				var td5=document.createElement("td");
				var td6=document.createElement("td");
				var td7=document.createElement("td");
				
				$(td1).attr("height","45px");
				$(td1).attr("padding-left","20px");
				$(td2).attr("align","center");
				$(td3).attr("align","center");		
					
				td1.innerHTML="<img src='/ktvOnline/photos/"+d[i].photo+"' height='80px'>";
				td2.innerHTML="<a target='_blank' href='javascript:queryInfo(\""+d[i].username+"\",0,1)' style='color: red'>"+d[i].username+"</a>";
				td3.innerHTML="<div class='myPost_hf' >"+d[i].nickname+"</div>";
				var sex;
				if(d[i].sex==0)
					sex="男";
				else
					sex="女";
				td4.innerHTML="<div class='myPost_hf' >"+sex+"</div>";
				td5.innerHTML="<div class='myPost_hf' >"+d[i].tip+"</div>";
				$(td6).attr("id","td6_"+d[i].username);
				if(d[i].lock==0)
					td6.innerHTML="<div class='myPost_hf' >正常</div>";
				else
					td6.innerHTML="<div class='myPost_hf' style='color:red'>封禁</div>";
								
				$(td7).attr("id","td7_"+d[i].username);
				if(d[i].lock==1){
				td7.innerHTML="<div class='myPost_time'><a href='javascript:void(0)' style='color: red'>锁定</a>"
					           +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:updatelock(\""+d[i].username+"\",0)'>解禁</a></div>";
				}
				else{
					td7.innerHTML="<div class='myPost_time'><a href='javascript:updatelock(\""+d[i].username+"\",1)'>锁定</a>"
				           +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' style='color: red'>解禁</a></div>";
				}
				
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				tr.appendChild(td6);
				tr.appendChild(td7);
				
				tbody[0].appendChild(tr);
			}
			
			$("#page").val(n);
			$("#total").text(total);
		}
	});
}

function queryInfo(fn,flag1,flag2){
	window.top.friendInfo(fn,flag1,flag2);
}

function updatelock(username,n){
	
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/LockUserServlet',
		dataType : 'json',
		data : {"username" : username,"lock":n},
		success : function(data) {
			if(data==true){
				var td6=$("#td6_"+username);
				var td7=$("#td7_"+username);
				if(n==0){
					td6[0].innerHTML="<div class='myPost_hf' >正常</div>";
					td7[0].innerHTML="<div class='myPost_time'><a href='javascript:updatelock(\""+username+"\",1)'>锁定</a>"
			           +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='####' style='color: red'>解禁</a></div>";
				}
				else{
					td6[0].innerHTML="<div class='myPost_hf' style='color:red'>封禁</div>";
					td7[0].innerHTML="<div class='myPost_time'><a href='####' style='color: red'>锁定</a>"
				           +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:updatelock(\""+username+"\",0)'>解禁</a></div>";
				}
				
			}
		}
	});
}

function lastPage2(){
	var page=$("#musicpage").val();
	if(page>1)
		selectMusic(parseInt(page)-1);
}
function nextPage2(){
	var page=$("#musicpage").val();
	var total=$("#musictotal").text();
	if(page<total)
		selectMusic(parseInt(page)+1);
}
function endPage2(){
	var total=$("#musictotal").text();
	selectMusic(total);
}
function selectMusic(n){
	var musicname=$("#musicname").val();
	var style=$("#style").val();
	var singer=$("#singer").val();
	
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/QueryMusicList',
		dataType : 'json',
		data : {"musicname" : musicname,"style" : style,"singer":singer,"page":n},
		success : function(data) {
			var d=data.list;
			var total=data.total;
			var tbody=$("#music-tbody");
			tbody.html("");			
			for(var i=0;i<d.length;i++){		

				var tr=document.createElement("tr");
				$(tr).css("height","30px");
				
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				var td3=document.createElement("td");
				var td4=document.createElement("td");
				var td5=document.createElement("td");
				
				$(td1).attr("height","45px");
				$(td1).attr("padding-left","20px");
				$(td2).attr("align","center");
				$(td3).attr("align","center");		
					
				td1.innerHTML="<img src='/ktvOnline/images/sing.jpg' height='52px' width='50px'>";
				td2.innerHTML="<a target='_blank'>"+d[i].name+"</a>";
				td3.innerHTML="<div class='myPost_hf' >"+d[i].style+"</div>";				
				td4.innerHTML="<div class='myPost_hf' >"+d[i].singer+"</div>";				
				td5.innerHTML="<div class='myPost_time'><a href='javascript:startMusic(\""+d[i].name+"\")'>试听</a>"
					           +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:deleteMusic(\""+d[i].name+"\",0)'>删除</a></div>";
				
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);				
				
				tbody[0].appendChild(tr);
			}
			
			$("#musicpage").val(n);
			$("#musictotal").text(total);
		}
	});
}

function first(){
	selectUser(1);
	$("#usermanage").css("display","block");
	$("#musicmanage").css("display","none");	
	$("#bottom").css("display","block");
	$("#bottom2").css("display","none");
}
function last(){
	selectMusic(1);
	$("#usermanage").css("display","none");
	$("#musicmanage").css("display","block");
	$("#bottom").css("display","none");
	$("#bottom2").css("display","block");
}

function startMusic(name){
	var audio=$("#audio_id");
	var singbg=$("#singbg");
	audio.attr("src","/ktvOnline/musics/"+name+".mp3");
	singbg.css("display","none");
	$("#lyricWrapper").css("display","block");
	
	var songName=name+".lrc";
	$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline/LrcServlet',
			dataType : 'json',
			data : {"songName":songName},
			success : function(data) {
	     
	     	      var lrc = document.getElementById("lyricContainer");	 
	     	      lrc.innerHTML="";
	     	      lrc.style.top="20px";
	     	      if(data!=false){
	                var n = Object.getOwnPropertyNames(data).length;
		            var p0 = document.createElement("p");
					var p1 = document.createElement("p");

	                $(p0).attr("id","line-0");
	                $(p1).attr("id","line-1");
					p0.innerHTML = data["singer"];
					p1.innerHTML = data["name"];
					lrc.appendChild(p0);
					lrc.appendChild(p1);

					for ( var i = 2; i < n - 1; i++)
	                    $(lrc).append("<p id='line-"+i+"' class='p' endTime='" + data["key"+i].endTime/1000 + "' beginTime='" + data["key"+i].beginTime/1000 + "' >" + data["key"+i].srtBody + "<br/>" + "</p>");
					
					audio[0].play();
					audio[0].ontimeupdate=function() {
					    var currentTime = audio[0].currentTime;
			            var beginTime = 0;
			            var endTime = 0;
			            var lrc = document.getElementById("lyricContainer");
			
			                $("#lyricContainer p").each(function(){
			                   beginTime =  $(this).attr("beginTime");
				               endTime = $(this).attr("endTime");
				               if(beginTime!=null&&currentTime>=beginTime){
								    $(this).siblings("p").removeClass("fontStyle");
								    $(this).addClass("fontStyle");
								    lrc.style.top = 20 - this.offsetTop + "px";
							       }else if(currentTime<beginTime)
							       return;
			                 });
					    }
	     	        }else{	     	        	
	     	        	lrc.innerHTML="<p>暂无歌词</p>";
	     	        	audio[0].play();
	     	        }
				}
			});	
}

function startLrc(audio) {

	// console.log(audio[0].currentTime);
	var currentTime = audio[0].currentTime;
	var beginTime = 0;
	var endTime = 0;
	var lrc = document.getElementById("lyricContainer");
	
	$("#lyricContainer p").each(function(){
	     beginTime =  $(this).attr("beginTime");
		 endTime = $(this).attr("endTime");
		 if(currentTime>=beginTime && currentTime<=endTime){
						$(this).siblings("p").removeClass("fontStyle");
						$(this).addClass("fontStyle");
						lrc.style.top = 130 - this.offsetTop + "px";
					}
	});
}

function deleteMusic(name){
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/DeleteMusic',
		dataType : 'json',
		data : {"musicname" : name},
		success : function(data) {
			if(data==true){
				selectMusic($("#musicpage").val());
			}else
				alert("无法预料的错误导致操作失败，请稍后重试！");
		}
	});
}



