<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

<title>My JSP 'main.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link href="/ktvOnline/css/text.css" rel="stylesheet" type="text/css">
<link href="/ktvOnline/css/button.css" rel="stylesheet" type="text/css">
<link href="/ktvOnline/css/main.css" rel="stylesheet" type="text/css">
</head>
<style>
	.centerButton{
  		border:none;
  		width:150px;
  		height:30px;
  		color:white;
  		text-align:center;
  		line-height:30px;
  		background:#5ba90b;
  		text-decoration:none;
  		display:inline-block;
  	}
</style>
<body>
	<table width="100%" border="0" cellspacing="0">
		<tr><div>
		<td colspan="4">
			<a href="javascript:createRoom()" class="centerButton">创建房间</a>
		</td>
			<td align="right">			
			<div style="position:relative;display:inline-block;">
          	<input type="text" class="text-selectRoom" id="roomName">
          	<label for="s_music" id="l1" class="label-default" style="position:absolute;top:0;left:5px;">搜索房间</label>
          	<input type="button" class="button-selectRoom" style="position:absolute;right:0;top:0;" value="" id="select" onclick="selectRoom()">
          </div>			
			</td>
			</div>
		</tr>
		<tbody id="troom">
		<tr height="250px">
			<td width="25%" height="100%" align="center">
			   
			</td>
			<td width="25%" align="center">
				
			</td>
			<td width="25%" align="center">
				
			</td>
			<td width="25%" align="center">
			
			</td>
			<td width="25%" align="center">
			
			</td>
		</tr>
		<tr height="250">
			<td align="center">
				
			</td>
			<td align="center"></td>
			<td align="center"></td>
			<td align="center"></td>
			<td width="25%" align="center">
			
			</td>
		</tr>
		<tr height="250">
			<td align="center"></td>
			<td align="center"></td>
			<td align="center"></td>
			<td align="center"></td>
			<td width="25%" align="center">
			
			</td>
		</tr>
		</tbody>
		<tr>
			
		</tr>
	</table>
</body>
<script type="text/javascript" src="<%=path%>/js/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  if(<%=request.getParameter("flag")%>!=null){
       window.top.send("Rooms:");
    }

  $("#roomName").focus(function(){
    $("#l1").hide();
  });
  
  $("#roomName").blur(function(){
    if($("#roomName").val()==""){
     $("#l1").show();
    } 
  });
});

function createRoom(){
   window.top.showRoom();
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
	} else if(pwd.css("display")=="block"){
			    if(target.closest(".pwd").length ==0&&target.closest(".main").length ==0){
			       pwd.css("display","none");
			      }		
	}     
	}) ;
	function selectRoom(){
	   var name=$("#roomName").val();
	   window.top.jlRoomName(name);
	}
</script>

</html>
