<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<% 
Cookie[] cookies=request.getCookies(); 
  String username="";
  String auto="";
  String power="none";
  if(cookies!=null){
    for(Cookie cookie:cookies){
      if(cookie.getName().equals("username")){
         username=cookie.getValue();
      }else if(cookie.getName().equals("auto")){
         auto=cookie.getValue();
      }else if(cookie.getName().equals("power")){
         power=cookie.getValue();
      }
    }
  }
  if(!username.equals("") && !auto.equals("")&& !power.equals("")){
    session.setAttribute("username", username);
    username="欢迎,"+username;
     if(power.equals("0"))
           power="block";
          else
            power="none";
  }else{
    if(request.getSession().getAttribute("username")!=null){
        username="欢迎,"+request.getSession().getAttribute("username");
        if(request.getSession().getAttribute("power").equals("0"))
           power="block";
          else
            power="none";
      }else{
        username="登录/注册"; 
        power="none";
    }
  }  
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>top</title>
<link href="/ktvOnline/css/user.css" rel="stylesheet" type="text/css">
</head>
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
		border-bottom:1px solid white;
	}
</style>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<form action="${pageContext.request.contextPath }/" method="post">
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="3" class="logo">
        	<img class="logoLeft" width="250" height="100" src="/ktvOnline/images/logoLeft.png">
        	<img class="logoRight" width="300" height="100" src="/ktvOnline/images/logoRight.png">
        </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0">
  <tr>
    <td width="200" height="25" bgcolor="#242424"></td>
    <td valign="top" bgcolor="#242424"><a href="/ktvOnline/User/main.jsp?flag=1" target="mainFrame" class="user_a"><label>K歌大厅</label></a></td>
    <td valign="top" bgcolor="#242424"><a href="javascript:except();" class="user_a"><label>人气歌手</label></a></td>
    <td valign="top" bgcolor="#242424"><a href="javascript:except();" target="_top" class="user_a"><label>歌曲会馆</label></a></td>
    <td valign="top" bgcolor="#242424"><a href="/ktvOnline/Admin/adminMain.jsp;" target="mainFrame" class="user_a"><label style="display:<%= power%>">管理界面</label></a></td>
    <td width="360" align="left" valign="top" bgcolor="#242424"><a href="javascript:LorS()" class="user_a" target="_top"><label id="label1"><%= username%></label></a></td>
  </tr>
</table>
</form>
<script src="/ktvOnline/js/jquery.js" type="text/javascript"></script>
<script src="/ktvOnline/js/top.js" type="text/javascript"></script>
<script type="text/javascript">
function except(){
  alert("暂未开放，敬请期待！");
}
</script>
</body>
</html>
