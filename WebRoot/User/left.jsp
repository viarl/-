<%@page import="javabean.UserInfo"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<% Cookie[] cookies=request.getCookies(); 
  String name="";
  String auto="";
  String sex="";
  String content="";
  String photo="photo1.jpg";
  String nickname="";
  String username="";
  UserInfo user=null;
  
  if(request.getAttribute("user")!=null){
    user=(UserInfo)request.getAttribute("user");
    sex=user.getSex();
    content=user.getContent();
    photo=user.getPhoto();
    nickname=user.getNickname();
    username=user.getUsername();
  }
  
  if(cookies!=null){
    for(Cookie cookie:cookies){
      if(cookie.getName().equals("username")){
         name=cookie.getValue();
      }else if(cookie.getName().equals("auto")){
         auto=cookie.getValue();
      }
    }
  }
  if(!name.equals("") && !auto.equals("")&& user==null){
     //session.setAttribute("username", name);
     response.sendRedirect("/ktvOnline/QueryUserByName?username="+name);
  }else{
    if(request.getSession().getAttribute("username")!=null&&user==null){
      name=(String)request.getSession().getAttribute("username");       
      response.sendRedirect("/ktvOnline/QueryUserByName?username="+name);
      }
  } 
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>left</title>
<link href="/ktvOnline/css/logodiv.css" rel="stylesheet" type="text/css">
<link href="/ktvOnline/css/user.css" rel="stylesheet" type="text/css">
</head>
<style>
	.meizi{
		width:36px;
		height:33px;
		background:white;
		position:absolute;
		left:83px;
		top:160px;
		font-size:20px;
		text-align:center;
		line-height:33px;
		font-weight:600;
	}
</style>
<body bgcolor="#CDCDC1">
<table width="240" height="520" border="0" align="center" cellpadding="0" cellspacing="0">
<tr>
 <td rowspan="4" width="120" align="left" background="/ktvOnline/images/bg_point_write.gif"><img id="photo" src="/ktvOnline/photos/<%= photo %>" width="125" height="139"></td>
 <td height="30" align="center"><span style="font-weight: 700;">昵称</span></td>
</tr>
<tr height="30">
 <td align="center"><label id="user_label"><%= nickname %></label></td>
</tr>
<tr height="30">
 <td align="center"><span style="font-weight: 700;">性别</span></td>
</tr>
<tr height="30">
 <td align="center"><label id="sex_label"><%= sex %></label></td>
</tr>
<tr><td height="10px" colspan="2"></td></tr>
<tr><td height="40px" colspan="2" align="left" valign="top" style="font-size: 13px"><span style="font-weight: 700;font-size: 15px">备注：</span>
<label id="content_label"><%= content %></label></td></tr>
  <tr>
    <td align="left" ><span style="font-weight: 700;font-size: 16px">好友列表(<label id="fnum">0</label>/20)</span></td>           
    <td ><label for="newFn" id="l1" class="label-default">新的朋友</label>
    <input type="text" class="text-selectFriend" id="newFn">
    <input type="button" class="button-selectfriend" value="" id="select" onclick="selectFriends()">
    </td>
  </tr>
  <tr height="290px">
  <td height="100%" colspan="2">
  
  <div id="friends" class="friends">
  
   <table id="friendsOnline">  
    <tbody id="Onlinebody">
     <tr></tr>
    </tbody>
         
   </table>
   
   <table id="friendsOutline">  
    <tbody id="Outlinebody">
    <tr></tr>
    </tbody>         
   </table>   
   </div>
      
  </td></tr>
</table>

<div class="ts" id="ts_div"><img src="/ktvOnline/images/newf_ts.gif" id="ts" onclick="show_newf()"></div>
    
    <div id="newf_div1" class="newf_div">
       <table align="center" border="0" width="100%">	       
			<tr>
			<td align="left"><label style="font-size: 13px; color: white;">新的好友请求:</label></td>
			<td align="right"></td>
			</tr>
			<tr height="2px"><td></td><td></td></tr>			 
    </table>
    
    <table id="newf_table" width="100%">
    <tbody id="newf_tbody" style="font-size: 13px;">
    <tr><td></td></tr>
    </tbody>
    </table>
    </div>   
    
<div id="logo" class="logo" align="left">
<span class="meizi">果</span>
	<table height="210px" width="100%" border="1px">
		<tr>
			<td>
				<img src="/ktvOnline/images/huaji.gif">
				
			</td>
			</tr>
			</table>
			<table height="320px" width="100%" border="1px">
			<tr>
			<td valign="top">
			Come On Friends!
			</td>
		</tr>
	</table>
</div>

</body>
<script type="text/javascript" src="/ktvOnline/js/jquery.js"></script>
<script type="text/javascript">
<%-- $(function(){   
   <% if(user!=null){%>
       $("#logo").css("display","none");
       var username="<%= username%>";
       window.top.connection(username,$("#user_label").text());
   <%}%>
}); --%>

var flag=0;
$(document).ready(function(){
 flag=1; 
  $("#newFn").focus(function(){
    $("#l1").hide();  
  });
  
  $("#newFn").blur(function(){
    flag=0;  
    if($("#newFn").val()==""){
     $("#l1").show();    
    } 
  });
});

 $(document).keyup(function(event){
		   if(event.keyCode==13){
		      if(flag==1)
		      $("#select").click();
		     }
		});   

function selectFriends(){
var nfn=$("#newFn").val();
if(nfn!=""){
var username=parent.frames["topFrame"].$("#label1").text();
var un=username.substring(3);
parent.top.newFriend(nfn,un);
}
}

$("body").bind("click",function(e){ 
	var target = $(e.target); 
	var item=window.top.$("#itemInfo");
	var finfo=window.top.$("#fInfo");
	var new_div1=$("#newf_div1");
	var room_div=window.top.$("#room_div");
	var friend=window.top.$("#friend");
	var pwd=window.top.$("#pwd_div");
	if(item.css("display")=="block"){
	   if(target.closest(".itemInfo_content").length ==0){
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
	}
	else if(new_div1.css("display")=="block"){
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
	
	function show_newf(){			
			var newf_div=$("#newf_div1")[0];
			newf_div.style.display="block";
		}
</script>
</html>

