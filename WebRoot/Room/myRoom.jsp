<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    session.setAttribute("roompwd","");
	String username = request.getParameter("username");
%>
<script type="text/javascript">
if("<%=session.getAttribute("username")%>"!="<%=username%>"){
	    alert("WANA---非法！！！");
	    window.location.href="/ktvOnline/ErrorHtml.html";
	}
</script>
<%
	String nickname = request.getParameter("nickname");
	String roomname = request.getParameter("roomname");
	String roomid=request.getParameter("roomid");
	String num = request.getParameter("num");
%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'myRoom.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="/ktvOnline/css/myroom.css" rel="stylesheet" type="text/css">
</head>

<script type="text/javascript" src="/ktvOnline/js/jquery.js"></script>
<script type="text/javascript" src="/ktvOnline/js/roomConn.js"></script>
<script type="text/javascript" src="/ktvOnline/js/roomRecord.js"></script>
<script type="text/javascript">
 $(function(){
    connection("<%=roomid%>","<%=username%>","<%=nickname%>","<%=num%>","<%=roomname%>");
	});
</script>
<style>
	*{
		margin:0;
		padding:0;
	}
	.logoLeft{
		float:left;
		margin-left:50px;
		top:20px;
		left:100px;
	}
	.logoRight{
		float:right;
		top:20px;
		right:100px;
	}
	.logo{
		background:#222;
	}
	.background{
		animation-name:run;
		animation-duration:50s;
		animation-iteration-count:infinite;
		background-size:cover;
	}
	@keyframes run{
		0% {background:url('/ktvOnline/images/0.jpg');background-size:cover;}
		25% {background:url('/ktvOnline/images/2.png');background-size:cover;}
		50% {background:url('/ktvOnline/images/00.jpg');background-size:cover;}
		75% {background:url('/ktvOnline/images/4.jpg');background-size:cover;}
		100% {background:url('/ktvOnline/images/1.png');background-size:cover;}
	}
</style>
<body>
<input type="hidden" id="userid" value="<%=username%>">
<table style="height:100%;width:100%;" border=0 cellpadding="0" cellspacing="0" >
    <tr>
        <td colspan="3" class="logo">
        	<img class="logoLeft" width="250" height="100" src="/ktvOnline/images/logoLeft.png">
        	<img class="logoRight" width="300" height="100" src="/ktvOnline/images/logoRight.png">
        </td>
    </tr>
    <tr height="27px" bgcolor="#242424">
        <td colspan="3" ></td>
    </tr>
    <tr>
        <td rowspan="2" class="sing">
        <table width="100%" height="100%" style="border-right-style: inset;" cellpadding="0" cellspacing="0">
        <tr height="5px"><td olspan="2"></td></tr>
          <tr height="27px">
          <td align="left" width="90px"><span style="font-weight: 700;font-size: 16px">已点歌曲</span></td>           
          <td >
          
          <div style="position:relative;display:inline-block;">
          	<input type="text" class="text-selectMusic" id="s_music">
          	<label for="s_music" id="l1" class="label-default" style="position:absolute;top:0;left:5px;">点歌入口</label>
          	<input type="button" class="button-selectMusic" style="position:absolute;right:0;top:0;" value="" id="select" onclick="selectMusic(0)">
          </div>        
          
          </td>
          </tr>
          <tr height="5px"><td colspan="2">        
          </td></tr>
         <tr><td colspan="2">
         <div class="div-musiclist">
           <table width="100%">
             <tbody id="musiclist">
             </tbody>
           </table>
           </div>
         </td></tr>
        </table>
        </td>       
        <td class="main">
        <table height="100%" width="100%" id="music-table" background="/ktvOnline/images/0.jpg" style="background-size:cover">
          <tr>
            <td>
              <div id="visualizer_wrapper" align="center">
                <canvas id='canvas' width="600" height="500" style="margin-top: -10px;height: 300px;"></canvas>
            </div>
            </td>
            <td>           
            	<div id="lyricWrapper" style="border: 2px">
					<p style="height: 40px"></p>
				<div id="lyricContainer"></div>
					<p style="height: 20px"></p>
				</div>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
                <input type="button" id="start" value="start" onclick="startCrazy()" disabled="disabled">
                <input type="button" id="nextMusic" value="next" onclick="nextMusic()" disabled="disabled">
                <input type="button" id="original" value="原唱" onclick="original()" disabled="disabled">
                <input type="button" id="music_bz" value="伴奏" onclick="music_bz()" disabled="disabled"> 
                <input type="button" id="music_bz" value="应用/取消背景" onclick="music_bg()">              
              </td>
          </tr>
          <tr><td colspan="2" align="center">
          <input type="hidden" id="audio_src" value="">
              <div><audio id="audio_id" controls></audio> 
              <div class="controls_content">&nbsp;</div>
              </div>                     
              </td>
          </tr>            
            </td>
          </tr>          
        </table>          
        </td>
        
        <td class="singer" style="vertical-align: top;">
        <div style="box-sizing: border-box;border-left-style: inset;height: 100%;width: 100%">
        <table width="170px" style="padding-left:10px;">
        <tr align="center"><td colspan="2"><span style="font-weight: 700;font-size: 16px">房间歌手(<label id="nowNum">0</label>/<label id="totalNum">0</label>)</span></td></tr>
           <tr align="center" height="5px"><td colspan="2"></td></tr>
          <tbody id="singerlist" class="singerlist">
          <tr><td>歌手区一二三</td>
          <td width="45px" align="center"><button style="margin-left: 10px;height:20px">举报</button> </td>
          </tr>   
          </tbody>              
        </table>  
        </div>  
        </td>
    </tr>
    <tr>
        <td class="chat" colspan="2">
        <div style="border-top-style: inset;height: 100%;width: 100%">
        <table style="height:100%;width:80%;">
            <tr>
                <td class="chatTd">
                    <div class="chatDiv" id="chatDiv">
                        <table class="chatTab">
                          <tbody id="chatBox"></tbody>                          
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 10px 3px 10px;height: 32px;">
                    <div class="sendDiv">
                        <input type="text" class="sendText" id="ChatValue"/>
                        <button class="sendBtn" onclick="sendText()">发送</button>
                    </div>
                </td>
            </tr>
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
<div id="tip_div">
感谢您对维护平台环境做的一份贡献！
</div>
</body>
<script type="text/javascript" src="/ktvOnline/js/roomMain.js"></script>
<script type="text/javascript" src="/ktvOnline/js/spectrum.js"></script>
</html>
