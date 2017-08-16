<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<% String username=(String)request.getParameter("username"); %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'privateCenter.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  <link rel="stylesheet" type="text/css" href="/ktvOnline/css/privateCenter.css">
  </head>  
  <style>
  	.top{
  		background:#222;
  		padding:10px 80px 10px 80px;
  		height:309px;
  	}
  	.top tbody{
  		color:white;
  	}
  	.top .right a{
  		color:white;
  		text-decoration:none;
  	}
  	.headImage{
  		width:180px;
  		height:196px;
  		background-size:cover;
  	}
  	.reset{
  		padding:0;
  		margin:0;
  	}
  	.topSubmit{
  		border:none;
  		width:173px;
  		height:30px;
  		color:white;
  		background:#5ba90b;
  	}
  	.centerButton{
  		border:none;
  		width:150px;
  		height:30px;
  		color:white;
  		background:#f87877;
  		margin:10px 10px 10px 10px;
  	}
  	.rightInput{
  		height:20px;
  		margin-bottom:10px;
  	}
  	.listFirstFont{
  		margin-bottom:10px;
  		font-size:30px;
  		font-family:'\5FAE\8F6F\96C5\9ED1';
  	}
  	.listFirstFont td:first-child{
  		color:#f87877;
  	}
  	.listFirstFont td:last-child{
  		font-size:25px;
  		color:rgba(105, 73, 73, 0.25);
  	}
  	.listFirstFont2{
  		color:#f87877;
  		font-size:30px;
  		font-family:'\5FAE\8F6F\96C5\9ED1';
  	}
  	.listSecondFont{
  		font-size:20px;
  		height:50px;
  		font-family:'\5FAE\8F6F\96C5\9ED1';
  	}
  	.lyLeft{
  		border-left: 5px solid #f87877;
  	}
  </style>
  <body>
        <table id="infoTab" class="InfoTab top">
        <tr>
            <td rowspan="3">
                <img id="photo" class="headImage" src="/ktvOnline/photos/photo1.jpg" alt=""/>
            </td>
            <td></td>
            <td rowspan="3" class="right">
            <div id="upload-div">
                <input type="file" id="music" name="music" style="display: none">
                <a href="javascript:musicUpload()">音乐上传(格式.mp3)</a></br>
                <input class="rightInput" id="m_text" type="text" disabled="disabled"></br>
                
                <input type="file" id="music_bz" name="music_bz" style="display: none">
                <a href="javascript:bzUpload()">伴奏上传(格式_BZ.mp3)</a></br>
                <input class="rightInput" id="b_text" type="text" disabled="disabled"></br>
                
                <input type="file" id="music_lrc" name="music_lrc" style="display: none">
                <a href="javascript:lrcUpload()">歌词上传(格式.lrc)</a></br>
                <input class="rightInput" id="l_text" type="text" disabled="disabled"></br>
                
                <label>歌曲类型(格式:xx/xx)</label></br>
                <input class="rightInput" id="style_text" type="text"></br>
                <label>歌手(格式:xx/xx)</label></br>
                <input class="rightInput" id="singer_text" type="text"></br>
                <input type="button" class="topSubmit" value="提交" onclick="submitAll()"></br>
             </div>
            </td>
        </tr>
        <tr>
            <td style="height:100px;"></td>
        </tr>
        <tr>
            <td>
            <label id="username"></label></br>
            <label id="nickname"></label><img id="sex" src="" alt=""/></br>
            <label id="centerContent"></label>
            </td>
        </tr>
    </table><br>
    <table id="songTab" class="SongTab">
        <tr align="center">
            <td valign="top" style="width:600px;">
                <div id="music_div">
                   <table>
                   <tbody>                    
                     <tr class="listFirstFont">
	                     <td align="center" colspan="2"><div  class="lyLeft" onclick="showMusic()" style="width:254px;">上传的原曲与伴奏</div></td>
	                     <td align="right"><div onclick="showLrc()" style="width:100px">歌词</div></td>
                     </tr> 
                   </tbody>                
                     <tbody id="music_tbody" align="center" >
                     <tr><td>歌曲名称</td>
                       <td>歌手</td>
                       <td>操作</td></tr>
                     </tbody>
                     <tbody id="lrc_tbody" style="display: none">
                       <tr>
	                       <td colspan="3" col="2">
		                       <div id="lyricWrapper" style="border: 2px">
							      <p style="height: 40px;text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000;text-align: center;" id="loading_3"></p>
						       <div id="lyricContainer"></div>
							      <p style="height: 20px"></p>
						       </div>
		                       <audio id="audio-play" style="height:30px" controls></audio>
		                       <audio id="audio-record2" autoplay></audio>
	                       </td>
                       </tr>                                            
                     </tbody>
                   </table>
                </div>
            </td>
            <td valign="top">
                <table id="table_record" style="display: none">
                  <tr align="center" style="width:200px"><td>
                      <div style="position:relative;display:inline-block;">
          				<input type="text" class="text-selectMusic" id="s_music" style="height:30px">
          				<label for="s_music" id="l1" class="label-default" style="position:absolute;top:3px;left:5px;">选择歌曲</label>
          				<input type="button" class="button-selectMusic" style="position:absolute;right:0;top:3px;" 
          				           value="" id="select" onclick="selectMusic(0)">
          			  </div>
                  </td></tr>
                  <tr align="center"><td>			
					  <input class="centerButton" type="button" value="停止录音" onclick="stopRecord()"/>
				      <input class="centerButton" type="button" id="playrecord" value="播放录音" onclick="playRecord()" disabled="disabled"/>
				      <input class="centerButton" type="button" value="上传" onclick="upload()"/>
                  </td></tr>
                  <tr align="center"><td><audio id="audio-record" autoplay controls style="width:150px"></audio></td></tr>
                </table>                                
            </td>
            <td valign="top" style="width:600px">
                <div id="record_div">
                  <table >
                   <tbody align="center">                    
                     <tr class="listFirstFont2"><td align="center" colspan="2"><div class="lyLeft" onclick="showMusic()">录制的歌曲</div></td>
                     <tr class="listSecondFont"><td>歌曲名称</td>
                       <td>操作</td></tr>
                     </tr> 
                   </tbody>                
                     <tbody id="record_tbody">                    
                     </tbody>               
                   </table>
                </div>
            </td>
        </tr>
    </table>
    
<div id="MyDiv" class="white_content">
<table width="100%" height="100%" style="color: white;">
<tr><td colspan="6" height="5px"></td></tr>
<tr align="center" height="30px" id="header" valign="middle">
<td onclick="selectMusic(1)">热门</td>
<td onclick="selectMusic(2)">流行</td>
<td onclick="selectMusic(3)">伤感</td>
<td onclick="selectMusic(4)">古风</td>
<td onclick="selectMusic(5)">欧美</td>
<td onclick="selectMusic(6)">日韩</td>
</tr>
<tr><td colspan="6" height="5px"></td></tr>
<tr><td colspan="6">
<table width="100%" height="100%" style="color: white;">
<tr height="30px" align="center">
<td rowspan="4" width="60"><div class="last"></div></td>
<td colspan="2">
<table width="100%">
<tr>
<td><div style="position:relative;display:inline-block;">
          	<input type="text" class="text-selectMusic" id="musicName">
          	<label for="musicName" id="l2" class="label-default" style="position:absolute;top:0;left:5px;">歌曲名称</label>
          </div></td>
<td><div style="position:relative;display:inline-block;">
          	<input type="text" class="text-selectMusic" id="musicStyle">
          	<label for="musicStyle" id="l3" class="label-default" style="position:absolute;top:0;left:5px;">歌曲风格</label>         
          </div></td>
<td><div style="position:relative;display:inline-block;">
          	<input type="text" class="text-selectMusic" id="musicSinger">
          	<label for="musicSinger" id="l4"  class="label-default" style="position:absolute;top:0;left:5px;">歌手姓名</label>          
          </div>     
</td>
<td width="40px"> <input type="button" value="搜索" onclick="selectMusic(7)">   </td>
</tr>
</table>
<td rowspan="4" width="60"><div class="next"></div></td>
</tr>

<tr>
<td rowspan="3" valign="top" width="398px" style="border-right: 1px white solid;">
<table width="100%" cellpadding="0px" cellspacing="0px" valign="top" class="selectlist">
<tr><td colspan="4" style="height: 10px"></td></tr>
<tbody id="left"></tbody>
<tr><td colspan="4" style="height: 10px"></td></tr>
</table>
</td>
<td rowspan="3" valign="top" width="398px">
<table width="100%" cellpadding="0px" cellspacing="0px" valign="top" class="selectlist">
<tr><td colspan="4" style="height: 10px"></td></tr>
<tbody id="right"></tbody>
<tr><td colspan="4" style="height: 10px"></td></tr>
</table>
</td>
</tr>
</table>
<tr><td colspan="4" height="5px"></td></tr>
<tr align="center"><td colspan="5" height="30px"><label style="font-size: 13px">
<a href="javascript:lastPage()" class="a-css">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;
当前<label id="page"></label>页 &nbsp;&nbsp;&nbsp;&nbsp;
<a href="javascript:nextPage()" class="a-css">下一页</a>
&nbsp;&nbsp;&nbsp;&nbsp;  共<label id="total"></label>页</label></td>
<td><a href="javascript:close()" class="a-css"><label style="font-size: 13px">退出点歌</label></a></td></tr>
<tr><td colspan="4" height="5px"></td></tr>
</table>
</div>

  </body> 
  <script src="/ktvOnline/js/jquery.js" type="text/javascript"></script>
  <script src="/ktvOnline/js/ajaxfileupload.js" type="text/javascript"></script>
  <script src="/ktvOnline/js/privateCenter.js" type="text/javascript"></script> 
  <script src="/ktvOnline/js/uploadRecord.js" type="text/javascript"></script>   
  <script type="text/javascript">
  var flag=0;
  $(function(){
	username="<%=username%>";
	if(username=="<%=session.getAttribute("username")%>"){
	  flag=1;
	  $("#table_record").css("display","block");
	}else
	  $("#upload-div").css("display","none");
	initHeader();
	initMusic();
	initRecod();
	
	 $("#music").on("change", function(){  
				$("#m_text").val(getFileName(document.getElementById("music").value));
    		}); 
	
     $("#music_bz").on("change", function(){  
				$("#b_text").val(getFileName(document.getElementById("music_bz").value));
            }); 
     $("#music_lrc").on("change", function(){  
				$("#l_text").val(getFileName(document.getElementById("music_lrc").value));
            }); 	
	});
	
  function songTabH(){
            var infoH = $("#infoTab").height();
            var winH = $(window).height();
            var songH = winH - infoH;
            $("#songTab").css("height",songH-55);
        }

        $(function (){
            songTabH();
        });
        
  function getObjectURL(file) {
			var url = null;
			if (window.createObjectURL != undefined) { // basic
				url = window.createObjectURL(file);
			} else if (window.URL != undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file);
			} else if (window.webkitURL != undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			}
			return url;
		}
   function getFileName(path){
		var pos1 = path.lastIndexOf('/');
		var pos2 = path.lastIndexOf('\\');
		var pos = Math.max(pos1, pos2);
        if( pos<0 )
			return path;
		else
			return path.substring(pos+1);
		}
		
	var recorder;
	var audio_record = document.getElementById("audio-record");
	var audio_bz = document.getElementById("audio-play");
	var record;
	var yon=0;
	function startRecording() {
	            yon=1;
	            audio_bz.volume = 0.3;
	            audio_record.src="";
	            $("#playrecord").attr("disabled",true);
				HZRecorder.get(function (rec) {
					recorder = rec;
					recorder.start();
				});
			}			
	function upload(){
	        if(record!=null){
	           recorder.upload("/ktvOnline/UploadRecord");
	        }else
	           alert("您还没有录制任何歌曲！");			
		};
	//获取录音
	function obtainRecord(){
			record = recorder.getBlob();
		};	
	function stopRecord(){
	     if(yon==1){
	        obtainRecord();
	        recorder.stop();
	        audio.pause();
			$("#playrecord").attr("disabled",false);
	        }
			yon=0;	     	        
		};			
	function playRecord(){
			recorder.play(audio_record);
			audio_record.ontimeupdate=function() {
			            if(audio_record.ended){
			            	audio.pause();		            	
			            	return;
			            }
			            audio.currentTime=audio_record.currentTime;
			}
			audio.currentTime=0;
			audio.play(0);
		};
		
		
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
		
		$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline//QueryRecordBZ',
			dataType : 'json',
			data : {"name":name,"style" : style,"singer" : singer,"host" : host,"page" : 1},
			success : function(data) {
				showResult(data);
			}
		});
		
		$("#page").text("1");
	}
	
	function selectM(page){
	$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline//QueryRecordBZ',
			dataType : 'json',
			data : {"name":name,"style" : style,"singer" : singer,"host" : host,"page" : 1},
			success : function(data) {
				showResult(data);
			}
		});
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
					+ "\")'>录制</a>";

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

var bz;
function choose(songName){
    bz=songName;
    songName=songName+"_BZ";
    if(!checkSrc(songName))
       songName=bz;
    listen(songName);
    bz=songName;
    audio.controls=false;
    audio.pause();
    var loading=$("#loading_3")[0];
    loading.innerHTML="(2s后开始)Loading。。。";
    close();
    setTimeout(function(){audio.play(0); 
      startRecording();     
      loading.innerHTML="";},2000);
}
function checkSrc(songName){
	var xmlHttp ;
	var url="/ktvOnline/musics/"+songName+".mp3";
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

function deleteRecord(name){
		$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline//PrivateDeleteRecord',
			dataType : 'json',
			data : {"songName":name,"username":username},
			success : function(data) {
				    if(data)
					    initRecod();
					else
						alert("无法预测的异常导致您的操作失败，请稍后重试！");
				}
			});
	}
    function deleteMusic(name){
    	$.ajax({
			type : 'get',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			url : '/ktvOnline//PrivateDeleteMusic',
			dataType : 'json',
			data : {"songName":name,"username":username},
			success : function(data) {
				if(data)
				   initMusic();
				else
					alert("无法预测的异常导致您的操作失败，请稍后重试！");
				}
			});
	}
  </script>
  
  <script>
    $(window).resize(function(){
        songTabH();
    });
  </script>
</html>
