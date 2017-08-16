var showdiv = $("#MyDiv"); 
		var showtable = $("#table1");

		function ShowDiv() {

			showdiv.css("width", "100%");
			showdiv.css("height", "800px");
			showdiv.css("top", "0px");
			showdiv.css("left", "0px");
			showdiv.css("display", "block");
			showtable.css("display", "block");
			//window.onmousewheel=document.onmousewheel=function() {return false;}
			$(document.body).css({
				"overflow" : "hidden"
			});
		}
		
		function clearText(){
          		
			$("#td1").html("");
			$("#td2").html("");
			$("#td3").html("");
			$("#password").val("");
			$("#code").val("");
			$("#autoLogin").get(0).checked=false;

			$("#rtd1").html("");
			$("#rtd2").html("");
			$("#rtd3").html("");
			$("#rtd4").html("");
			$("#rusername").val("");
			$("#rpassword").val("");
			$("#rpassword2").val("");
			$("#nickname").val("");
			$("#radio1").prop("checked","checked");
			$("#agreement").get(0).checked=false;
			$("#register_button").attr("disabled","disabled");	
		}
 
		function CloseDiv() {
			showdiv.css("display", "none");
			showtable.css("display", "none");
			$("#table2").css("display", "none");
			$("#table3").css("display", "none");
			clearText();
			
		};
		
		$(document).keyup(function(event){
		   if(event.keyCode==13){
		     if(showtable.css("display")=="block"){
		       $("#login").click();
		     }
		     
		     var rb=$("#register_button");
		     if($("#table2").css("display")=="block"&&!rb.prop("disabled")){
		    	 rb.click();
		     }
		   }
		});

		function Login() {			

			if(!checkall('username','td1','password','td2')){
			   return false;
			}
			var username = $("#username").val();
			var password = $("#password").val();
			var code=$("#code").val();
			var autoLogin=false;
			if($("#autoLogin").get(0).checked){
			    autoLogin=true;
			}

			$.ajax({
						type : 'post',
						contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
						url : '/ktvOnline/LoginServlet',
						dataType : 'json',
						data : {"username" : username,"password" : password,"code":code,"autoLogin":autoLogin},
						success : function(data) {
							if (data== false) {
								etd.css("display", "table-cell");
								etd.html("*用户名不存在或密码错误！");
								return false;
							}else if(data.flag=="codeFail"){
								etd.css("display", "table-cell");
								etd.html("*验证码错误！");
								$("#authcode")[0].src="/ktvOnline/AutoCodeServlet?s="+new Date().getTime();
							}else if(data.flag=="lock"){
								etd.css("display", "table-cell");
								etd.html("*该用户已被封禁！");
							}else{	
							    window.frames[0].frames["topFrame"].$("#label1").text("欢迎，"+data.username);
							    window.frames[0].frames["topFrame"].location.reload();
							    window.frames[0].frames["leftFrame"].$("#user_label").text(data.nickname);		
							    window.frames[0].frames["leftFrame"].$("#sex_label").text(data.sex);
							    window.frames[0].frames["leftFrame"].$("#content_label").text(data.content);
							    window.frames[0].frames["leftFrame"].$("#photo").attr("src","/ktvOnline/photos/"+data.photo);
							    window.frames[0].frames["leftFrame"].$("#logo").css("display","none");
							    //alert( window.frames[0].frames["leftFrame"].$("#photo")[0].src)							    
							    CloseDiv();		
							    connection(data.username,data.nickname);
							}
						}
					});
		}
		
		function return_Login(){
						
			clearText();
			$("#table2").css("display", "none");
			showtable.css("display", "block");							
		}
		
		function show_register(){
		    $("#table2").css("display","block");
		    showtable.css("display","none");
		    $("#td1").html("");
			$("#td2").html("");
			$("#td3").html("");
			$("#password").val("");
		}
		
		function register_user(){	
			
			var user = $("#rusername").val();
			var utd = $("#rtd1");
			var rep = /^\w{6,30}$/;
			if (user == "") {
				utd.css("display", "table-cell");
				utd.html("*用户名不能为空！");
				return false;
			}
			if (!rep.test(user)) {
				utd.css("display", "table-cell");
				utd.html("*用户名为6~30位！");
				return false;
			}
			$.ajax({	
				type:"post",
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
				url:"/ktvOnline//CheckNameServlet",
				dataType:"json",
				data:{"username":user},
				success:function(data){			
					if(data==false){
						utd.css("display", "table-cell");
						utd.html("*用户名已存在！");						
						return false;
					}
					else{
						utd.css("display", "none");						
						 if(!checkregister()){          	
				            	return false;
				            }
						
						    var username = $("#rusername").val();
							var password = $("#rpassword").val();
							var nickname = $("#nickname").val();
							var sex = $('input[name="sex"]:checked').val();
							
							$.ajax({
								
								type:"post",
								contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
								url:"/ktvOnline/RegisterServlet",
								dataType:"json",
								data:{"username":username,"password":password,"nickname":nickname,"sex":sex},
								success:function(data){
									
									if(data==true){
										$("#username").val(username);
										$("#password").val(password);
										$("#table2").css("display","none");	
										$("#table3").css("display","block");
																													
									}
									else{
										var ptd=$("#"+rtd4);
										ptd.css("display","table-cell");
										ptd.html("*注册时异常，请重新操作！");
										return false;
									}
								}				
							});
						
						return true;
					}
				}				
			});	              
		}				
		
		function showItem(){
			$("#itemInfo").css("display","block");
		}
		
		function closeItem(){
			$("#itemInfo").css("display","none");
		}
		
		function intemInfo(un){
			
			var nick=window.frames[0].frames["leftFrame"].$("#user_label").text();		
		    var sex= window.frames[0].frames["leftFrame"].$("#sex_label").text();
		    var content=window.frames[0].frames["leftFrame"].$("#content_label").text();
		    var src=window.frames[0].frames["leftFrame"].$("#photo").attr("src");			
			$("#itemtitle").text(un);
			$("#itemname").text(un);
			$("#itemnick").text(nick);
			$("#icontent").text(content);
			$("#iphoto").attr("src",src);
			if(sex=="男")
				$("#itemsex1").attr("checked",true);
			else
				$("#itemsex2").attr("checked",true);
			showItem();
		}	
		
		function showFinfo(){
			$("#fInfo").css("display","block");
		}
		
        function closeFinfo(){
        	$("#fInfo").css("display","none");
        	
        	$("#itemtitle").text("");
			$("#itemname").text("");
			$("#itemnick").text("");
			$("#icontent").text("");
			$("#iphoto").attr("src","");				
			$("#itemsex1").attr("checked","checked");				
		}
		
        function friendInfo(fn,flag1,flag2){
        	//flag1为判断是否在线:0离线，1在线; flag2判断是否为好友关系，以及是否由好友请求中转发的：0好友，1非好友，2非好友且为转发
        	var nick;
        	var sex;
        	var content;
        	var src;
        	
        	$.ajax({
				type : 'get',
				contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
				url : '/ktvOnline/QueryFriendInfo',
				dataType : 'json',
				data : {"username" : fn},
				success : function(data) {					
					nick=data.nickname;
					sex=data.sex;
					content=data.content;
					src=data.photo;
					
					if(flag1=="0"){
						$("#chat").attr("class","info2_a");
						$("#chat").attr("href","javascript:void(0)");
					}else{
						$("#chat").attr("class","info_a");
						$("#chat").attr("href","javascript:window.top.chat(\""+fn+"\",\""+nick+"\")");
					}
					
					if(flag2=="2"){
						$("#yorn").text("同意");
						$("#a_add").attr("href","javascript:window.frames[0].frames['leftFrame'].sureAdd(\""+fn+"\")"); 
					}else if(flag2=="0"){
						$("#a_add").attr("href","javascript:deleteFriend(\""+fn+"\")");	
					}
					else if(flag2=="1"){
						$("#yorn").text("加为好友");
						if(flag1=="0"){
							$("#a_add").attr("class","info2_a");
							$("#a_add").attr("href","javascript:void(0)");
						}else{
							$("#a_add").attr("href","javascript:addFriend(\""+fn+"\")");
						}				     
					}
					
					$("#f_center").attr("href","javascript:other(\""+fn+"\")");
					
					$("#ftitle").text(fn);
					$("#fname").text(fn);
					$("#fnick").text(nick);
					$("#fcontent").text(content);
					$("#fphoto").attr("src","/ktvOnline/photos/"+src);	
					if(sex=="男")
						$("#fsex1").attr("checked","checked");
					else
						$("#fsex2").attr("checked","checked");
					showFinfo();
				}
			});      	
		}				
        
        function showFriends(){
			$("#friend").css("display","block");
		}	
		
		function closeFriends(){
			$("#friend").css("display","none");
			var tbody=document.getElementById("fon");				
			var tbody2=document.getElementById("fout");	
			$(tbody).html("");
			$(tbody2).html("");
		}
		
		function newFriend(nfn,un){
			$.ajax({
				type : 'post',
				contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
				url : '/ktvOnline/QueryFriendsServlet',
				dataType : 'json',
				data : {"nickname" : nfn,"username":un},
				success : function(data) {

					var flag=0;
					var friends_info=data;
					var tbody=document.getElementById("fon");				
					var tbody2=document.getElementById("fout");	

					$(tbody).html("");
					$(tbody2).html("");
					
					for(i in friends_info){
						
						var fn=friends_info[i].username;
						var fnn=friends_info[i].nickname;

						if(window.frames[0].frames["leftFrame"].$("#u_"+fn)[0]==null){
							
							var tr=document.createElement("tr");						
							var td1=document.createElement("td");
							var td2=document.createElement("td");
							var td3=document.createElement("td");
							
							td1.id="u_"+fn;
							td1.id="c_"+fn;
							td1.id="i_"+fn;
							td2.style.width="40px";
							td3.style.width="40px";
							
							
							if(friends_info[i].onlineflag=="1"){						
								
							   td1.innerHTML="<a href='javascript:queryInfo(\""+fn+"\",1,1)' class='friend_online' >"+fnn+"("+fn+")"+"</a>";									
							   td2.innerHTML="<a href='javascript:addFriend(\""+fn+"\")' class='friend_online'>添加</a>";					
							   td3.innerHTML="<a href='javascript:void(0)' class='friend_online'>在线</a>";							   					
							   tr.appendChild(td1);
							   tr.appendChild(td2);
							   tr.appendChild(td3);
							   tbody.appendChild(tr);	
							}

							if(friends_info[i].onlineflag=="0"){	
								
								   td1.innerHTML="<a href='javascript:queryInfo(\""+fn+"\",0,1)' class='friend_outline' >"+fnn+"("+fn+")"+"</a>";										
								   td2.innerHTML="<a href='javascript:void(0)' class='friend_outline' >添加</a>";					
								   td3.innerHTML="<a href='javascript:void(0)' class='friend_outline' >离线</a>";		
								   tr.appendChild(td1);
								   tr.appendChild(td2);
								   tr.appendChild(td3);
								   tbody2.appendChild(tr);	
							}	
							
							flag++;
						}												
					}
					
					$("#nfnum").text(flag);
					showFriends();
				}
			});
		}
		
		function addFriend(fn){
			if($("#friend").css("display")=="block")
				$("#friend").css("display","none");
			
			var msg="Add:"+fn;
			if(typeof ws != "undefined") 
			  send(msg);
			else
			  window.frames[0].frames["leftFrame"].send(msg);
		}
		
		function update(){
			
			$("#updateItem").css("display","none");
			$("#sureItem").css("display","block");
			
			$("#itemnick").css("display","none");
			$("#tnick").css("display","block");
			$("#tnick").val($("#itemnick").text());
			$("#itemsex1").attr("disabled",false);
			$("#itemsex2").attr("disabled",false);
			$("#icontent").attr("disabled",false);
			$("#b_upload").attr("disabled",false);	
		}
		
		function closeUpdate(){
			$("#updateItem").css("display","block");
			$("#sureItem").css("display","none");
			
			$("#itemnick").css("display","block");
			$("#tnick").css("display","none");
			$("#itemsex1").attr("disabled",true);
			$("#itemsex2").attr("disabled",true);
			$("#icontent").attr("disabled",true);
			$("#b_upload").attr("disabled",true);	
			var src=window.frames[0].frames["leftFrame"].$("#photo").attr("src");
			$("#iphoto").attr("src",src);
			
			$("#iupload").on("change", function(){  
				var objUrl;
				if(navigator.userAgent.indexOf("MSIE")>0){
				objUrl = this.value;
				}else
				objUrl = getObjectURL(this.files[0]);
				console.log("objUrl = "+objUrl) ;
				$("#iphoto").attr("src",objUrl);
            }); 			
		}
		
		function sure(){
			
			var nick=$("#tnick").val();
        	var sex=$('input[name="isex"]:checked').val();;
        	var content=$("#icontent").val();
        	var photo=$("#iphoto").attr("src");

        	$.ajaxFileUpload({
        	      url : '/ktvOnline/UpdateInfoServlet',
        	      //contentType : 'multipart/form-data',
        	      type: 'post',
        	      secureuri : false,
        	      fileElementId : 'iupload',
        	      data:{"nickname":nick,"sex":sex,"content":content},
        	      dataType : 'JSON',
        	      success : function (data, status) {
        	         if(data=true){
        	        	 if(sex=="0")
        	        		 sex="男";
        	        	 else
        	        		 sex="女";
						    window.frames[0].frames["leftFrame"].$("#user_label").text(nick);		
						    window.frames[0].frames["leftFrame"].$("#sex_label").text(sex);
						    window.frames[0].frames["leftFrame"].$("#content_label").text(content);
						    window.frames[0].frames["leftFrame"].$("#photo").attr("src",photo);

						    $("#itemInfo").css("display","none"); 
							closeUpdate();																		
							
        	         }else
        	        	 alert("更新失败，请稍后重试！");
        	      },
        	      error : function (data, status, e) {
        	    	  alert("无法预测的异常导致您的操作失败，请稍后重试！");
        	      }
        	    });
	
		}
		
		function deleteFriend(fn){
			
			var msg="Del:"+fn;
			if(typeof ws != "undefined") 
				  send(msg);
				else
				  window.frames[0].frames["leftFrame"].send(msg);  	
			$("#fInfo").css("display", "none");
		}
		
		function shownews(){
			ChatShow();	
			if($("#stranger_ts").text()!=""){
				chatToStranger();
				$("#stranger_ts").text("");
			}
		}
		
		function chatToStranger(){
			$("[name='chatTbody']").hide();
			$("[name='user_a_all']").attr("bgcolor","#F0FFF0");
			 var chatstranger=$("#chatstranger");
			 if(chatstranger!=null){
				 chatstranger.show();
				 chatstranger.find("tr[name='user_a_all']").show();
				 chatstranger.find("tr:first").attr("bgcolor","#B2DFEE");
				 var id=chatstranger.find("tr:first").attr("id");
				 id=id.substring(3,id.length);
				 $("#chatTitle").text(id);
				 $("#tbody_"+id).show();
			 }
		}
		
		function closeChat(fn){
			var csbody=$("#tbody_"+fn);
			var cstr=$("#tr_"+fn);
			csbody.css("display","none");
			cstr.css("display","none");
			
			var flag=0;
			var names=$("[name='user_a_all']");
			for(var i=0;i<names.length;i++){		
				if($(names[i]).css("display")!="none"){
					var id=names[i].id.substring(3,names[i].id.length);
					$("#tbody_"+id).show();
					$("#chatTitle").text(id);
					break;
				}	
				flag++;
			}
			if(flag==names.length)
				ChatClose();
		}
		
		function closeStranger(fn){
			$("#tr_"+fn).remove();
			csbody=$("#tbody_"+fn).hide();
			var flag=0;
			var names=$("[name='user_a_all']");
			for(var i=0;i<names.length;i++){		
				if($(names[i]).css("display")!="none"){
					var id=names[i].id.substring(3,names[i].id.length);
					$("#tbody_"+id).show();
					$("#chatTitle").text(id);
					break;
				}	
				flag++;
			}
			if(flag==names.length)
				ChatClose();
		}
		
		    var roomLock=0;
		    function showRoom(){
		    	if(roomLock==1){
		    		alert("您当前已在房间中，退出后才能再次加入！");
		    		return true;
		    	}
		    	if(window.frames[0].frames["topFrame"].$("#label1").text()=="登录/注册"){
		    		alert("请先登录，登陆后可进行此操作！");
		    		ShowDiv();
		    		return true;
		    	}
		        var username=window.frames[0].frames["topFrame"].$("#label1").text();
		    	var roomid=username.substring(3);
		    	
		    	$("#roomtitle").text(roomid);
		    	$("#roomname").val(roomid);
		    	$("#roomPhoto").attr("src",window.frames[0].frames["leftFrame"].$("#photo").attr("src"));
	        	$("#room_div").css("display","block");	        	
	        }
		    
		    function createRoom(){			    	
		    	var username=$("#roomtitle").text();
		    	var roomname=$("#roomname").val();
		    	var nickname=window.frames[0].frames["leftFrame"].$("#user_label").text();
		    	var roompwd=$("#roompsd").val();
		    	var num=$("#rnum").val();
		    	var src=$("#roomPhoto").attr("src");

		    	$.ajax({
					type : 'get',
					contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
					url : '/ktvOnline/CreateRoom',
					//dataType : 'json',
					data : {"roomname" : roomname,"roompwd":roompwd,"num":num,"src":src},
					success : function(data) {					
						if(data!=false){
							$("#room_div").css("display","none");	
							var pWin = window.open("/ktvOnline/Room/myRoom.jsp?roomid="+data+"&&username="+username+"&&nickname="+nickname+"&&num="+num+"&&roomname="+roomname);							
							if(pWin!=null){
								roomLock=1;			    		
							}
							timer=window.setInterval(function(){ifClose(pWin);},500);																				
						}else{
							alert("无法预料的异常导致您的操作失败，请稍后重试！");
						}
					},
					error:function (){
						alert("无法预料的异常导致您的操作失败，请稍后重试！");
					}
				});      			    			    		    	
		    }
		    
		var timer ; 
		function ifClose(pWin){
			if(pWin.closed==true){
				roomLock=0;
				window.clearInterval(timer);
			}
		}
		    
		function scrollBot(){
			$("#chatBodyDiv").scrollTop($("#chatText").height());
		}
		
		var jlroom="";
		function jlRoomName(name){
			jlroom=name
			send("SelectRoomByName:"+jlroom);
		}
		
		function showRooms(d){
			var tbody=window.frames[0].frames["mainFrame"].$("#troom");
			window.frames[0].frames["mainFrame"].$("div.main").remove();
			var tdts=window.frames[0].frames["mainFrame"].$('#troom tr:eq(1) td:eq(2)');
			if(d.length==0){			
				tdts[0].innerHTML="暂无房间，快去创建吧！";
				return true;
			}
			tdts[0].innerHTML="";
			for(var i=0;i<d.length;i++){
				var td=window.frames[0].frames["mainFrame"].$('#troom tr:eq('+parseInt(i/5)+') td:eq('+i%5+')');				
				var s1=" <div class='main' onclick='window.top.addRoom(\""+d[i].id+"\",\""+d[i].num+"\",\""+d[i].roomname+"\",\""+d[i].pwd+"\",\""+d[i].playing+"\")'><div class='id'>";
				var s2="";
				if(d[i].pwd!="0")
				  s2="<img class='lock' src='/ktvOnline/images/roomlock.png'/>";
				
		        var s3="房间ID："+d[i].id+"</div>";
				var s4="<img style='height:185px;width:165px;' src='"+d[i].src+"'/><br>"+
		                "<div class='roomInfo'><label class='roomLab'>"+d[i].roomname+d[i].num+"</label><br>";
				var s5;
				if(d[i].playing==0)
				    s5="<label>等待中...</label></div></div>";
				else
					s5="<label>进行中...</label></div></div>";
				
				if(s2=="")
					td[0].innerHTML=s1+s3+s4+s5;
				else
					td[0].innerHTML=s1+s2+s3+s4+s5;
			}				
		}
		var roomid;
		var roomnum;
		var roomn;
		var roompwd;
		function addRoom(id,num,roomname,pwd,playing){
			if(window.frames[0].frames["topFrame"].$("#label1").text()=="登录/注册"){
	    		alert("请先登录，登陆后可进行此操作！");
	    		ShowDiv();
	    		return true;
	    	}
			if(roomLock==1){
	    		alert("您当前已在房间中，退出后才能再次加入！");
	    		return true;
	    	}
			if(playing==1){
				alert("该房间已经开始，请选择其他房间进入！");
				return true;
			}
			
			roomnum=num;
			var n= num.split("/");
			num=n[1].substring(0,n[1].length-1);
			nowNum=n[0].substring(1);
			if(nowNum>=num){
				alert("该房间已经满人，请选择其他房间！");
	    		return true;
			}
			roomid=id;
			roomn=roomname;			
			var username;
			var nickname;
			username=window.frames[0].frames["topFrame"].$("#label1").text().substring(3);
			nickname=window.frames[0].frames["leftFrame"].$("#user_label").text();
						
			if(pwd=="0"){
			   var pWin=window.open("/ktvOnline/Room/myRoom.jsp?roomid="+id+"&&username="+username+"&&nickname="+nickname+"&&num="+num+"&&roomname="+roomname);
			   $("#pwd_div").css("display","none");
			   if(pWin!=null){
				    roomLock=1;			    		
				}
				timer=window.setInterval(function(){ifClose(pWin);},500);	 
			}
			if(pwd=="1"){
				$("#pwd_div").css("display","block");
			}		
		}
		function sureRoom(){
			roompwd=$("#pwd").val();
			$.ajax({
				type : 'post',
				contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
				url : '/ktvOnline/ValidatePwd',
				dataType : 'json',
				data : {"roomid" : roomid,"roompwd":roompwd},
				success : function(data) {	
					if(data==false){
					   alert("密码错误，请重新输入！");				
					}else{
					   addRoom(roomid,roomnum,roomn,0);
					}
				},
				error:function (){
					alert("无法预料的异常导致您的操作失败，请稍后重试！");
				}
			});      			
		}
		
		function owner(){
			var username=window.frames[0].frames["topFrame"].$("#label1").text().substring(3);
		    window.open("/ktvOnline/User/privateCenter.jsp?username="+username);
		    $("#itemInfo").css("display","none");
		}
		
		function other(name){
			window.open("/ktvOnline/User/privateCenter.jsp?username="+name);
		    $("#fInfo").css("display","none");
		}
		