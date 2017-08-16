 var flag=0;
$(document).ready(function(){ 
  var s_music=$("#s_music");
  var musicName=$("#musicName");
  var musicStyle=$("#musicStyle");
  var musicSinger=$("#musicSinger");
  
  s_music.focus(function(){
    flag=1;
    $("#l1").hide();      
  });  
  s_music.blur(function(){
    flag=0;  
    if(s_music.val()==""){
     $("#l1").show();       
    } 
  });
  
  musicName.focus(function(){
    $("#l2").hide();      
  });  
  musicName.blur(function(){ 
    if(musicName.val()=="")
     $("#l2").show();        
  });
  
  musicStyle.focus(function(){
    $("#l3").hide();      
  });  
  musicStyle.blur(function(){ 
    if(musicStyle.val()=="")
     $("#l3").show();        
  });
  
  musicSinger.focus(function(){
    $("#l4").hide();      
  });  
  musicSinger.blur(function(){ 
    if(musicSinger.val()=="")
     $("#l4").show();        
  });
});

 $(document).keyup(function(event){
		   if(event.keyCode==13){
		      if(flag==1)
		      $("#select").click();
		     }
		});   

var n=0;

window.onbeforeunload=function(ev) { 
	window.event.returnValue="确定离开此房间吗？";
	 } ;
	


var name = "";
var style = "";
var singer = "";
var host = 0;
function selectMusic(n) {
	if (n == 0) {
		$("#MyDiv").css("display", "block");
		name = $("#s_music").val();
		if (name == "") {
			style = "";
			singer = "";
			host = 1;
		} else {
			style = "";
			singer = "";
			host = 0;
		}
	}
	if (n == 1)
		host = 1;
	if (n == 2) {
		style = "流行";
		host = 0;
	}
	if (n == 3) {
		style = "伤感";
		host = 0;
	}
	if (n == 4) {
		style = "古风";
		host = 0;
	}
	if (n == 5) {
		style = "欧美";
		host = 0;
	}
	if (n == 6) {
		style = "日韩";
		host = 0;
	}
	if (n == 7) {
		name = $("#musicName").val();
		style = $("#musicStyle").val();
		singer = $("#musicSinger").val();
		if (name == "" && style == "" && singer == "")
			host = 1;
		else
			host = 0;
	}
	var data = {
		action : 'Select',
		name : name,
		style : style,
		singer : singer,
		host : host,
		page : 1
	}
	sendMsg(JSON.stringify(data));
	$("#page").text("1");
}

function selectM(page){
	var data = {
			action : 'Select',
			name : name,
			style : style,
			singer : singer,
			host : host,
			page : page
		}
	sendMsg(JSON.stringify(data));
	$("#page").text(page);
}

function close() {
	$("#MyDiv").css("display", "none");
}

function nextPage() {
	var page = $("#page").text();
	var total = $("#total").text();
	if (page != total)
		selectM(parseInt(page)+1)
}

function lastPage() {
	var page = $("#page").text();
	if (page != 1)
		selectM(parseInt(page)-1)
}

function showResult(d) {
	var total = d.total;
	var list = d.list;
	var left = $("#left");
	var right = $("#right");
	left.html("");
	right.html("");

	if (list.length == 0) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		$(td1).attr("height", "45px");
		$(td1).attr("align", "center");
		td1.innerHTML = "暂无此歌曲<br>您可以为网站上传此曲"
		tr.appendChild(td1);
		left[0].appendChild(tr);
	} else {
		for ( var i = 0; i < list.length; i++) {

			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");
			var td3 = document.createElement("td");
			var td4 = document.createElement("td");
			$(td4).attr("width", "10px");

			td1.innerHTML = list[i].name;
			td2.innerHTML = list[i].singer;
			td3.innerHTML = "<a href='javascript:choose(\"" + list[i].name
					+ "\")'>点播</a>";

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);

			if (i > 5)
				right[0].appendChild(tr);
			else
				left[0].appendChild(tr);
		}
		$("#total").text(total);
	}
}

function showList(f,d){
	var tbody=$("#singerlist");		
    tbody.html("");	
	for (var key in d) {  
		
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
        var name=key;
        var nickname=d[key];
        
	    td1.innerHTML =nickname;
	    if(userName!=name)
		    td2.innerHTML = "<button id='"+name+"_but' style='margin-left: 10px;height:20px' onclick='tip(\""+name+"\")'>举报</button>";
	    else
	    	td2.innerHTML = "<button style='margin-left: 10px;height:20px' disabled='disabled'>举报</button>";
	    
		tr.appendChild(td1);
		tr.appendChild(td2);	
		tbody[0].appendChild(tr);
	} 
	
	var tbodyc=document.getElementById("chatBox");		          	        
    var trc=document.createElement("tr");						
	  var tdc=document.createElement("td");
	  var tdc2=document.createElement("td");
	  var tdc3=document.createElement("td");
	  $(tdc).attr("class","talkTd1");
	  $(tdc2).attr("class","talkTd2");
	  $(tdc3).attr("class","talkTd3");
    
	  tdc.innerHTML="系统";
	  tdc2.innerHTML="▷";
	  tdc3.innerHTML=f;
	  
	  trc.appendChild(tdc);
	  trc.appendChild(tdc2);
	  trc.appendChild(tdc3);
	  tbodyc.appendChild(trc);	  
	  scrollBot();
	
	var now=tbody.find("tr").length;
	$("#nowNum").text(parseInt(now));
}

function choose(songname){
	var data = {
			action : 'Choose',
			songname : songname,
		}
	sendMsg(JSON.stringify(data));
}

function showChoosed(username,songname,flag){
	var id=$("#userid").val();
	var musiclist=$("#musiclist");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var time=new Date().getTime();
	
	$(td2).attr("width","50px");
	$(tr).attr("id",time);	
	td1.innerHTML="<label>"+songname+"</label>";
	if(username==id)
	   td2.innerHTML="<input type='button' value='删除' onclick='delMusicList(\""+time+"\",\""+songname+"\")'>";
    if(username!=id&&flag=="Choose")
	   td2.innerHTML="<label>等待</label>";
    if(flag=="nowPlay"){
       $(td1).find("label").css("color","#9B30FF");
       td2.innerHTML="<label style='color:#9B30FF;'>播放中</label>";     
    }
	tr.appendChild(td1);
	tr.appendChild(td2);	
	musiclist[0].appendChild(tr);
}

function delMusicList(time,songname){
	var data = {
			action : 'DeleteMusicList',
			songname : songname,
		};
	sendMsg(JSON.stringify(data));
	
	var tr = document.getElementById(time);
	$("#musiclist")[0].removeChild(tr);
}
function showNewList(list){
	startyorn=0;
	$("#musiclist")[0].innerHTML="";
	for(var i=0;i<list.length;i++){
		var name=list[i]["username"];
		var song=list[i]["songname"];
		var flag=list[i]["action"];
		showChoosed(name,song,flag);
	}
}

function startCrazy(){
	var data = {
			action : 'Start',
		};
	sendMsg(JSON.stringify(data));
	$("#start").attr("disabled",true);	
}

function nextMusic(){
	bz_exist=false;
	var data = {
			action : 'Next',
		};
	sendMsg(JSON.stringify(data));
	recorder.stop();
	audio[0].pause(); 
}
function startLock(flag){
	if(flag==1){
		$("#start").attr("disabled",false);
	}else
		$("#start").attr("disabled",true);	
	$("#original").attr("disabled",true);
	$("#music_bz").attr("disabled",true);
}
function unlock(flag){
	if(flag==1){
		$("#nextMusic").attr("disabled",false);
		$("#original").attr("disabled",false);
		$("#music_bz").attr("disabled",false);
	}else{
		$("#nextMusic").attr("disabled",true);
		$("#original").attr("disabled",false);
		$("#music_bz").attr("disabled",false);
	}
}

function audio_src(){
	$("#audio_id").attr("src","");
}

function goNext(name){
	var tr0=$('#musiclist tr:eq(0)')[0];
	if(name==""){
		$("#audio_id").attr("src","");
		if($("#musiclist")[0]!=null)
			$("#musiclist")[0].removeChild(tr0);
		document.getElementById("lyricContainer").innerHTML="";
		document.getElementById("lyricContainer").style.top="20px";
		$("#nextMusic").attr("disabled",true);
		$("#original").attr("disabled",true);
		$("#music_bz").attr("disabled",true);
		var lrc = document.getElementById("lyricContainer");
		lrc.innerHTML="已经是最后一首了QAQ";
		return true;
	}
	$("#musiclist")[0].removeChild(tr0);	
	startMusic(name);
}
var audio=$("#audio_id");
function startMusic(name){
	if(name==""){
		startLock(0);
		$("#audio_id").attr("src","");
		audio[0].pause();
		var tr0=$('#musiclist tr:eq(0)')[0];
		if($("#musiclist")[0]!=null)
			$("#musiclist")[0].removeChild(tr0);
		document.getElementById("lyricContainer").innerHTML="";
		document.getElementById("lyricContainer").style.top="20px";
		$("#nextMusic").attr("disabled",true);
		$("#original").attr("disabled",true);
		$("#music_bz").attr("disabled",true);
		var lrc = document.getElementById("lyricContainer");
		lrc.innerHTML="已经是最后一首了QAQ";
		return true;
	}
	bz_exist=checkSrc("/ktvOnline/musics/"+name+"_BZ.mp3");
	audio.attr("src","/ktvOnline/musics/"+name+".mp3");	
	$("#audio_src").val(name);
	$("#lyricWrapper").css("display","block");
	
	//加载字幕
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
	     	      
	     	      var first1=$('#musiclist tr:eq(0) td:eq(0) label');
				  var first2=$('#musiclist tr:eq(0) td:eq(1)')[0];
					
				  first1.css("color","#9B30FF");
				  first2.innerHTML="<label style='color:#9B30FF;'>播放中</label>";
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

					for ( var i = 2; i < n; i++)
	                    $(lrc).append("<p id='line-"+i+"' class='p' endTime='" + data["key"+i].endTime/1000 + "' beginTime='" + data["key"+i].beginTime/1000 + "' >" + data["key"+i].srtBody + "<br/>" + "</p>");
									
					//启动麦克风
					startRecording();					
					audio[0].ontimeupdate=function() {
					    var currentTime = audio[0].currentTime;
			            var beginTime = 0;
			            var endTime = 0;
			            var lrc = document.getElementById("lyricContainer");
			            if(audio[0].ended){
			            	audio[0].ontimeupdate=null;
			            	nextMusic();			            	
			            	return;
			            }
			            
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
	     	        	startRecording();
	     	        	audio[0].ontimeupdate=function() {
	     	        		var currentTime = audio[0].currentTime;
	 			            if(audio[0].ended){
	 			            	audio[0].ontimeupdate=null;
	 			            	nextMusic();
	 			            	return;
	 			            }
	     	        	}
	     	        }
				}
			});	
}
var recorder;
function startRecording() {
	HZRecorder.get(function (rec) {
		recorder = rec;
		recorder.start();
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

var bz_exist=false;
function music_bz(){		   	  
	   var name=$("#audio_src").val();
	   var audio = $("#audio_id");
	   var currentTime = audio[0].currentTime;
	   var src="/ktvOnline/musics/"+name+"_BZ.mp3";
	   if(bz_exist){
	      audio.attr("src",src);
	      audio[0].currentTime=currentTime;
	      audio[0].play();	
	   }else
		  return;
	}

function checkSrc(url){
	var xmlHttp ;
    if (window.ActiveXObject)
     {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
     }
     else if (window.XMLHttpRequest)
     {
      xmlHttp = new XMLHttpRequest();
     } 
    xmlHttp.open("Get",url,false);
    xmlHttp.send();
    if(xmlHttp.status==404)
    return false;
    else
    return true;
}

	function original(){
	   var name=$("#audio_src").val();
	   var audio = $("#audio_id");
	   var currentTime = audio[0].currentTime;
	   audio.attr("src","/ktvOnline/musics/"+name+".mp3");
	   audio[0].currentTime=currentTime;
	   audio[0].play();
	}
	
	function stopRecord(){
		recorder.stop();
	};

	var context = new AudioContext();
	var audioRecord=document.getElementById("audio_record");
	var startyorn=0;
	var source;
	var reader;
	function startRecord(data){
		reader = new FileReader();
		reader.readAsArrayBuffer(data);
		reader.onload = function (e) {
		    console.info(reader.result);     
		    context.decodeAudioData(reader.result, function(buffer) {//解码成pcm流
		    	visualize(context, buffer);
             });                                      
		};	
	}
	
	//接收处理音频流
	function visualize(context, buffer){
	    var audioBufferSouceNode;
	    audioBufferSouceNode= context.createBufferSource();
        audioBufferSouceNode.buffer = buffer;
        //audioBufferSouceNode.connect(context.destination);
        
        var gain = context.createGain();
        audioBufferSouceNode.connect(gain);
        gain.connect(context.destination);
        gain.gain.value = 0.8;
        
        if(source!=null)
        	source.stop(0); 
        audioBufferSouceNode.start(0);
        source=audioBufferSouceNode;
        source.onended=function(){
        	//console.log("end");
        }
        if(startyorn==0)
            startlisten();
        startyorn=1;
}
	
	var src_BZ;
	function startlisten(){		
		var name=$('#musiclist tr:eq(0) td:eq(0) label').text();		
		var audio=$("#audio_id");	
		audio.attr("src","/ktvOnline/musics/"+name+".mp3");
		//audio[0].currentTime=context.currentTime;	
		//开始频谱加载
		startDraw(audio[0]);
		var singbg=$("#singbg");
		singbg.css("display","none");
		$("#audio_src").val(name);
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

						for ( var i = 2; i < n; i++)
		                    $(lrc).append("<p id='line-"+i+"' class='p' endTime='" + data["key"+i].endTime/1000 + "' beginTime='" + data["key"+i].beginTime/1000 + "' >" + data["key"+i].srtBody + "<br/>" + "</p>");
																				
						
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
		     	        }
					}
				});	
	}
	
	function sendText(){
		
		var name=nickName;
		 var v = $("#ChatValue")[0];
		    if (v.value.length>0){
		      var data={
		    		  action:"Text",
		    		  data:name+"_"+v.value
		      };
		      sendMsg(JSON.stringify(data));
		     	    	
		      var tbody=document.getElementById("chatBox");		          	        
		      var tr=document.createElement("tr");						
			  var td=document.createElement("td");
			  var td2=document.createElement("td");
			  var td3=document.createElement("td");
			  $(td).attr("class","talkTd1");
			  $(td2).attr("class","talkTd2");
			  $(td3).attr("class","talkTd3");
		      
			  td.innerHTML=name;
			  td2.innerHTML="▷";
			  td3.innerHTML=v.value;
			  
			  tr.appendChild(td);
			  tr.appendChild(td2);
			  tr.appendChild(td3);
			  tbody.appendChild(tr);
			  
			  scrollBot();
			  $("#ChatValue").focus();
		      v.value='';
		    }
	}
	function scrollBot(){
		$("#chatDiv").scrollTop($("#chatBox").height());
	}
	
	function showText(data){
		var d=data.split("_");
		var name=d[0];
		var text=d[1];
		var tbody=document.getElementById("chatBox");		          	        
	      var tr=document.createElement("tr");						
		  var td=document.createElement("td");
		  var td2=document.createElement("td");
		  var td3=document.createElement("td");
		  $(td).attr("class","talkTd1");
		  $(td2).attr("class","talkTd2");
		  $(td3).attr("class","talkTd3");
	      
		  td.innerHTML=name;
		  td2.innerHTML=":";
		  td3.innerHTML=text;
		  
		  tr.appendChild(td);
		  tr.appendChild(td2);
		  tr.appendChild(td3);
		  tbody.appendChild(tr);		  
		  scrollBot();
	}
	$(document).keyup(function(event){		   
		     if($("#ChatValue").is(":focus"))
		    	 if(event.keyCode==13)
		    	   sendText();	    
		});
	
	function tip(name){
		$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline/TipServlet',
			dataType : 'json',
			data : {"username" : name},
			success : function(data) {
				if(data){
					$("#tip_div").css("display","block");
					setTimeout(function(){$("#tip_div").css("display","none");},2000);
					$("#"+name+"_but").attr("disabled","disabled");
				}else{
					alert("举报过程由于不为人知的干扰导致操作失败，请稍后重试QAQ");
				}
			}
		});
	}
	
	var bg_f=0;
	function music_bg(){
		if(bg_f==0){
			$("#music-table").attr("class","background");
			bg_f=1;
		}else{
			$("#music-table").attr("class","");
			bg_f=0;
		}		
	}
