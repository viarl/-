        function s4(len) {
	        var tpl = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	        var i = 0;
	        var s4 = "";
	        while (i < len) {
	        	i++;
	        	s4 += tpl.charAt(Math.ceil(Math.random() * (tpl.length - 1)));
	        }
	        return s4;
        }
        
        function connAll() {
        	if (!window.WebSocket && window.MozWebSocket)
    			window.WebSocket = window.MozWebSocket;
    			if (!window.WebSocket) {
    				alert("浏览器不支持WebSocket，即无法实现与其他用户的信息交互功能！");
    				return false;
    			}
    		 var ws;
             var username=s4(6) + "-" + s4(6) + "-" + s4(6) + "-" + s4(6);
             var nickname="0";
             var msg = "Tourist:" + username + "_" + nickname;
             startWebSocket(msg);
        }
        
		function startWebSocket(msg) {
			ws = new WebSocket("wss://" + location.host + "/ktvOnline/AllSocketServlet");
			ws.onopen = function() {
				console.log("success open");
				send(msg);
				if(window.frames[0].frames["topFrame"].$("#label1").text()!="登录/注册"){
		     	     window.frames[0].frames["leftFrame"].$("#logo").css("display","none");
		     	     var username=window.frames[0].frames["topFrame"].$("#label1").text().substring(3);
	                 connection(username,window.frames[0].frames["leftFrame"].$("#user_label").text());
		    	 }
			};

			ws.onmessage = function(event) {
				console.log("RECEIVE:" + event.data);
				handleData(event.data);
			};

			ws.onerror = function(event) {
				console.log("WebSocketError!");
			};

			ws.onclose = function(event) {
				console.log("Client notified socket has closed", event);
			};

		}
		
		function connection(username, nickname) {
			var msg = "Name:" + username + "_" + nickname;
			send(msg);
		}

		function handleData(data) {
			var vals = data.split(":");
			var msgType = vals[0];
			var d=data.substring(msgType.length+1, data.length);
			switch (msgType) {
			
			case "AddReq":
				var names=d.split("_");
				var name=names[0];
				var nick=names[1];

				if($("#new_"+name).val()==name){
				}else{
				var tbody=$("#newf_tbody")[0];
				var ts=$("#ts_div");
				
				if(tbody==null){
					tbody=window.frames[0].frames["leftFrame"].$("#newf_tbody")[0];
					ts=window.frames[0].frames["leftFrame"].$("#ts_div");
				}
				
				ts.css("display","block");
				var tr=document.createElement("tr");				
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				var td3=document.createElement("td");
				$(tr).attr("name","new_tr");
				$(tr).attr("id","new_tr_"+name);
				td1.style.width="123px";
				td2.style.width="30px";
				$(td2).attr("align","left");
				td3.style.width="30px";
				
				 td1.innerHTML="<input type='hidden' id='new_"+name+"' value='"+name+"'><a href='javascript:window.top.queryInfo(\""+name+"\",1,2)' class='friend_a'>"+nick+"("+name+")"+"</a>";
				 td2.innerHTML="<a href='javascript:window.top.sureAdd(\""+name+"\")' class='friend_a'>同意</a>";
				 td3.innerHTML="<a href='javascript:window.top.refuseAdd(\""+name+"\")' class='friend_a'>拒绝</a>";
				 
				 tr.appendChild(td1);
				 tr.appendChild(td2);
				 tr.appendChild(td3);
				 tbody.appendChild(tr);
				}
				break;
				
			case "AddRsp":
				if(d==0){
					alert("对方已离线");
				}else if(d==1){
					alert("请求成功，等待对方回复");
				}
				break;
				
			case "Error":
											
				alert(d);
				break;
				
			case "Json":

				var friends_info=$.parseJSON(d);
				var tbody=document.getElementById("Onlinebody");				
				var tbody2=document.getElementById("Outlinebody");
				var fnum=document.getElementById("fnum");
				if(tbody==null){
					tbody=window.frames[0].frames["leftFrame"].$("#Onlinebody")[0];					
					tbody2=window.frames[0].frames["leftFrame"].$("#Outlinebody")[0];
					fnum=window.frames[0].frames["leftFrame"].$("#fnum")[0];
				}

				$(tbody).html("");
				$(tbody2).html("");
				var flag=0;
				
				for(i in friends_info){
					
					var fn=friends_info[i].friendname;
					var fnn=friends_info[i].fnickname;
								
					var tr=document.createElement("tr");
					
					var td1=document.createElement("td");
					var td2=document.createElement("td");
					var td3=document.createElement("td");
					
					td1.id="u_"+fn;
					if(friends_info[i].friendflag=="1"){						
						
					   td1.innerHTML="<a href='javascript:window.top.queryInfo(\""+fn+"\",1,0)' class='friend_online' id='online_"+fn+"'>"+fnn+"</a>";									
					   td2.innerHTML="<a href='javascript:window.top.chat(\""+fn+"\",\""+fnn+"\")' class='friend_online' id='c_"+fn+"'>聊天</a>";					
					   td3.innerHTML="<a href='javascript:window.top.invite(\""+fn+"\")' class='friend_online'>邀请</a>";							   					
					   tr.appendChild(td1);
					   tr.appendChild(td2);
					   tr.appendChild(td3);
					   tbody.appendChild(tr);	
					}

					if(friends_info[i].friendflag=="0"){	
						
						   td1.innerHTML="<a href='javascript:window.top.queryInfo(\""+fn+"\",0,0)' class='friend_outline'>"+fnn+"</a>";					
						   td2.innerHTML="<a href='javascript:void(0)' class='friend_outline' >聊天</a>";					
						   td3.innerHTML="<a href='javascript:void(0)' class='friend_outline' >邀请</a>";		
						   tr.appendChild(td1);
						   tr.appendChild(td2);
						   tr.appendChild(td3);
						   tbody2.appendChild(tr);	
					}	
					
				    flag++;				
				}
				$(fnum).text(parseInt(flag));
				break;
				
			case "Text":
				var toText=d.split("_");
				var fromName=toText[0];
				var fromPhoto=toText[1];
										
				var text=window.top.$("#chatText")[0];
				var tbody=window.top.$("#tbody_"+fromName)[0];
				var judge=$("#u_"+fromName)[0];
				
				var flag=$("#user_label")[0];
				if(flag==null)
				    judge=window.frames[0].frames["leftFrame"].$("#u_"+fromName)[0];
				
				if(tbody==null){	    	  	    	  
			    	  tbody=document.createElement("tbody");
			    	  tbody.id="tbody_"+fromName;
			    	  $(tbody).attr("name","chatTbody");
			    	  $(tbody).css("display","none")
			      }
				if(window.top.$("#tr_"+fromName).attr("bgcolor")=="#B2DFEE"){
					$(tbody).show();
				}
				if($(tbody).css("display")=="none")
					$(tbody).css("display","none");
				  
			      var tr=document.createElement("tr");						
				  var td=document.createElement("td");
				  var td2=document.createElement("td");
				  var td3=document.createElement("td");
			      
				  td.innerHTML="<img src='/ktvOnline/photos/"+fromPhoto+"' width='25' height='25'>";
				  td2.innerHTML="<div class='commentL'>"+toText[2]+"</div>";
				  tr.appendChild(td);
				  tr.appendChild(td2);
				  tr.appendChild(td3);
				  tbody.appendChild(tr);
				  text.appendChild(tbody);	
				  
				  if(judge==null){
					  if(window.top.$("#chatMain").css("display")=="none"||$(tbody).css("display")=="none"){						  
					    window.top.$("#a_news").css("display","block");
					    window.top.$("#stranger_ts").text(":有未读的陌生人消息！");
					  }
					    
					    var	tr1=window.top.$("#tr_"+fromName)[0];
					    if(tr1==null){	
					    	var	chatstranger=window.top.$("#chatstranger")[0];
							tr1=document.createElement("tr");
							tr1.id="tr_"+fromName;	
							$(tr1).attr("name","user_a_all");
							if($(tbody).css("display")=="none"){
						    	$(tr1).css("display","none");
						    }
						    var td=document.createElement("td");
						    $(td).attr("align","left");
						    //$(tr).attr("onclick","");
					      
						    td.innerHTML="<a href='javascript:toHeorShe(\""+fromName+"\")' style='color:red;'>"+fromName+"</a> <button onclick='closeChat(\""+fromName+"\")'>X</button>";
						    tr1.appendChild(td);
						    chatstranger.appendChild(tr1);					    
					      }	else{
					    	  if($(tr1).attr("bgcolor")=="#B2DFEE"){
					    		  window.top.$("#chatTitle").text(fromName);
								  window.top.$("#tbody_"+fromName).show();	
					    	  }
					    	  else{
					    		  $(tr1).attr("bgcolor")=="#F0FFF0"	;					 
					    	  }
					      }					    	  						  						  
					    
						return true;
					}
				  ts_pop(fromName,tbody);
				  scrollBot();
				break;
			
			case "Rooms":	
				if(window.top.jlroom=="")
                   window.top.showRooms($.parseJSON(d));
				break;				
				
			case "RoomsByName":
				   window.top.showRooms($.parseJSON(d));
				break;
			default:
				break;

			}
		}

		function send(data) {
			console.log("Send:" + data);
			ws.send(data);
		}		
		
		function closeSocket(){
			ws.close();
		}
		
		function queryInfo(fn,flag1,flag2){
			if(window.top.$("#friend").css("display")=="block")
				window.top.$("#friend").css("display","none");
			window.top.friendInfo(fn,flag1,flag2);
		}
				
		function sureAdd(a){
			var flag="Sure:"+a;								
			var tr=window.frames[0].frames["leftFrame"].$("#new_tr_"+a);
			var ts=window.frames[0].frames["leftFrame"].$("#ts_div");
			
			if(typeof ws != "undefined")
			    send(flag);	
			else
				window.top.send(flag);
			tr.remove();	
			var trs=window.frames[0].frames["leftFrame"].document.getElementsByName("new_tr");
			if(trs.length==0)
				ts.css("display","none");
		}
		
		function refuseAdd(a){
			var tr=$("#new_tr_"+a);
			var ts=$("#ts_div");
			tr.remove();	
			var trs=document.getElementsByName("new_tr");
			if(trs.length==0)
				ts.css("display","none");
		}				
		
        function chat(fn,fnn){
			
        	if($("#fInfo").css("display")!="none")
        		$("#fInfo").css("display","none");
        	var	chatFriend=window.top.$("#chatfriend")[0];
        	var	tr=window.top.$("#tr_"+fn)[0];
        	window.top.$("[name='chatTbody']").hide();
        	window.top.$("[name='user_a_all']").attr("bgcolor","#F0FFF0");
			if(tr==null){	    	  	    	  
				tr=document.createElement("tr");
				tr.id="tr_"+fn;	
				$(tr).attr("name","user_a_all");
			    var td=document.createElement("td");
			    $(td).attr("align","left");
			    //$(tr).attr("onclick","");
		      
			    td.innerHTML="<a href='javascript:toHeorShe(\""+fn+"\")'>"+fnn+"</a> <button onclick='closeChat(\""+fn+"\")'>X</button>";
			    tr.appendChild(td);
			    chatFriend.appendChild(tr);
		      }	
			  $(tr).attr("bgcolor","#B2DFEE");
			  $(tr).show();
			  window.top.$("#chatTitle").text(fn);
			  window.top.$("#tbody_"+fn).show();
			  window.top.$("#chatMain").css("display","block");
			  ts_reset(fn);
		}

        function invite(){
	
	
        }
		       
		function toHeorShe(fn){
			 /*window.top.$("#chatTitle").text(fn);
			 window.top.$("[name='chatTbody']").hide();
			 window.top.$("#tbody_"+fn).show();*/
			chat(fn);
		}
		
		function ts_pop(fromName,tbody){
			
			var main=window.top.$("#chatMain");
			if(main.css("display")=="none" || $(tbody).css("display")=="none"){				
				tdts=$("#c_"+fromName)[0];				
				if(tdts==null){
					var tdts=window.frames[0].frames["leftFrame"].$("#c_"+fromName)[0];
					if(tdts==null){
						
					}else
						$(tdts).attr("class","chat_ts");
				}else
					$(tdts).attr("class","chat_ts");
			}
		}
		
		function ts_reset(fn){
			
			tdts=$("#c_"+fn)[0];				
			if(tdts==null)
				var tdts=window.frames[0].frames["leftFrame"].$("#c_"+fn)[0];

		    $(tdts).attr("class","friend_online");
		    if(window.top.$("#chatstranger").find("tr[id='tr_"+fn+"']")[0]!=null){
		    	window.top.$("#a_news").hide();
		    	window.top.$("#stranger_ts").text("");
		    }	   
		}	
		
		