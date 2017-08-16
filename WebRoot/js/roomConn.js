var roomId;
var userName;
var roomName;
var nickName;
var Num;
function connection(roomid,username,nickname,num,roomname) {
			if (!window.WebSocket && window.MozWebSocket)
				window.WebSocket = window.MozWebSocket;
			if (!window.WebSocket) {
				alert("浏览器不支持WebSocket，即无法实现与其他用户的信息交互功能！");
				return false;
			}
			var ws;		
			roomId=roomid;
			userName=username;
			nickName=nickname;
			roomName=roomname;
			Num=num;
			var msg={					
					action:"Room",
					roomid:roomId,
					roomname:roomName,
					username:userName,
					nickname:nickName,
					num:Num
			};
			startWebSocket(msg);
			$("#totalNum").text(num);		
		}

		function startWebSocket(msg) {
			ws = new WebSocket("wss://" + location.host + "/ktvOnline/RoomServlet");
			ws.onopen = function() {
				console.log("success open");
				sendMsg(JSON.stringify(msg));
			};

			ws.onmessage = function(event) {
				console.log("RECEIVE:" + event.data);
				if(event.data instanceof Blob)
					startRecord(event.data);
				else
				    handleData(event.data);
			};

			ws.onerror = function(event) {
				console.log("WebSocketError!");
			};

			ws.onclose = function(event) {
				console.log("Client notified socket has closed", event);
			};			
		}			

		function handleData(data) {		
			var data = JSON.parse(data);
			switch(data.action){
			case "candidate": //增加候选者(表示有人连接上了)
				peerConn.addIceCandidate(new RTCIceCandidate(data.data));
				break;
			case "sdp": //设置远程视频描述(包含远程视频流,码率等)
				peerConn.setRemoteDescription(new RTCSessionDescription(data.data));
				break;
			case "Text":  //文字聊天
				showText(data.data);
				break;
			case "List":
				showList(data.flag,data.map);
				break;
				
			case "Choose":
				showChoosed(data.username,data.songname,data.action);				 
				break;
				
			case "Result":				
				showResult(data.data);
				break;
				
			case "ShowMusicList":
			    showNewList(data.data);
			    break;
			    
			case "Unlock":
				startLock(1);
				break;
			    
			case "Start":
				if(data.song=="")
					startMusic(data.song);
				else {
			         if (data.lockflag != null)
				        unlock(data.lockflag);
		             if (data.musicList != null && data.musicList != ""&& data.lockflag == 0) {
				        showNewList(data.musicList);
						 if(data.from==1)
							 audio_src();
			           } else
				         startMusic(data.song);
	           	}
				break;
				
			case "Next":
				if(data.song=="")
					goNext(data.song);
				else {
			         if (data.lockflag != null)
				        unlock(data.lockflag);
		             if (data.musicList != null && data.musicList != ""&& data.lockflag == 0) {
				        showNewList(data.musicList);
				        if(data.from==1)
							 audio_src();
			           } else
				         goNext(data.song);
	           	}
				break;
			}							
		}

		function sendMsg(data) {
			console.log("Send:" + data);
			ws.send(data);
		}
		
		function g(a){
			
			return document.getElementById(a);
		}