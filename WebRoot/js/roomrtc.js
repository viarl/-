// 使用Google的stun服务器
var config = {
	iceServers : [ { //这里写url和urls是做chrome和firefox的兼容,firefox使用urls读取iceServer
		// stun:stunserver.org
		// stun:23.21.150.121
		url:"stun:stun.l.google.com:19302",
		//url :"stun:stunserver.org",
		urls :"stun:stunserver.org"
	} ]
};
var mediaConstraints = {
	optional : [],
	mandatory : {
		OfferToReceiveAudio :true,
		//OfferToReceiveVideo :true
	}
};


// 兼容浏览器的getUserMedia写法
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
		|| navigator.mozGetUserMedia || navigator.msGetUserMedia;
// 兼容浏览器的PeerConnection写法
var PeerConnection = (window.PeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
// 兼容浏览器的SessionDescription写法
var SessionDescription = window.mozRTCSessionDescription
		|| window.RTCSessionDescription;
// 兼容浏览器的RTCIceCandidate写法
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;


var peerConn = new PeerConnection(config);
// 注册icecandidate事件
peerConn.onicecandidate = function(event) {
	if (!event || !event.candidate)
		return;
	console.log("获取IceCandidate结果:" + event.candidate);
	var data = {
		action :'candidate',
		data :event.candidate
	};
	sendMsg(JSON.stringify(data));
};
// 注册addstream事件
peerConn.onaddstream = function(event) {
	console.log("加载远程音频流");
	// locale.mozRequestFullScreen();
	// 绑定远程媒体流到video标签用于输出
	g("audio_user").src = window.URL.createObjectURL(event.stream);
	g("audio_id").src="/ktvOnline/musics/玄觞 - 黯然销魂.mp3";
	g("audio_user").play();
	g("audio_id").play();
};


function initRTC(){
	getLocaleStream();
}

function onMediaStreamSuccess(audio_stream) {
	
	/*audioContext = new AudioContext();
	var playerAnalyser = audioContext.createAnalyser(),
	playerSource = audioContext.createMediaElementSource(g("audio_id"));
	playerAnalyser.connect(audioContext.destination);//声音连接到扬声器
	playerSource.connect(playerAnalyser);//截取音频信
*/	var audio=g("audio_user");
	console.log("加载本地音频流");
	peerConn.addStream(audio_stream);
    audio.src = window.URL.createObjectURL(audio_stream);
}


/*******************************************************************************
 * 关于信令: 如果某人希望共享自己的媒体,则发送一个offer信令给其他人,他就是offer(房主)
 * 如果某人从其他人那收到一个offer信令,他希望加入,他就是answer(房客)
 */
function call(isCaller) {
	if (isCaller) {
		// 创建一个offer信令
		peerConn.createOffer( function(offer) {
			peerConn.setLocalDescription(offer);
			// 通知offer远程sdp
				var data = {
					action :'sdp',
					data :offer
				};
				sendMsg(JSON.stringify(data));
				// bindRemoteVideo(offer,video_stream);
			}, function(error) {
				// alert(error);
			}, mediaConstraints);
	} else {
		// 创建一个answer信令
		peerConn.createAnswer( function(answer) {
			peerConn.setLocalDescription(answer);
			// 通知answer远程sdp
				var data = {
					action :'sdp',
					data :answer
				};
				sendMsg(JSON.stringify(data));
			}, function(error) {
				// alert(error);
			}, mediaConstraints);
	}


}


function getLocaleStream() {
	console.log("获取本地音频流");
	getUserMedia.call(navigator, {
		audio :true
	}, onMediaStreamSuccess, function(error) {
		alert(error.name || error);
	});
}