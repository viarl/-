<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'adminMain.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
    <link rel="stylesheet" type="text/css" href="/ktvOnline/css/adminMain.css">
  </head>
  <body>
   <div id="usermanage" style="display: block">
   <table width="1090px" style="vertical-align: top">
     <tr align="center">
       <td><div class="header">
         <a href="javascript:first()" class="first">
             <label>用户管理</label>
         </a></div></td>
       <td><div class="header">
         <a href="javascript:last()" class="last">
             <label>曲库管理</label>
       </a></div></td>
     </tr>  
     <tr><td colspan="2" bgcolor="#12b7f5"></td></tr>
     <tr><td colspan="2" height="5px"></td></tr>
     <tr>
         <td colspan="2" height="30px">
            <table width="725" border="0" align="center" cellpadding="0" cellspacing="0">            
               <tr>
                  <td width="5"></td>
                  <td width="8%" height="25" align="right" class="text_cray1">用户名&nbsp;&nbsp;</td>
                  <td width="11%" align="left" class="text_cray1"><label>
                     <input id="username" type="text" class="text_cray" style="width:80px">
                     </label></td>
                  <td width="8%" align="right" class="text_cray1">昵称&nbsp;&nbsp;</td>
                  <td width="6%" align="left" class="text_cray1"><label>
                     <input id="nick" type="text" class="text_cray" style="width:80px">
                     </label></td>
                 <td width="15%" align="right" class="text_cray1">被举报次数(≥)&nbsp;&nbsp;</td>
                 <td width="13%" align="left" class="text_cray1"><label>
                     <input id="tip" type="text" class="text_cray" style="width:80px">          
                     </label></td>
                 <td width="8%" align="right" class="text_cray1">用户状态&nbsp;&nbsp;</td>
                 <td width="13%" align="left" class="text_cray1"><label>
                     <select class="text_cray" id="lock" style="width:100px">  
                        <option value="2">全部</option>       
                        <option value="0">正常</option>
                        <option value="1">封禁</option>                       
                     </select>
                     </label></td>                 
                 <td width="8%" align="center" valign="middle"><label>
                     <input type="button" onclick="selectUser(1)" value="查询">
                     </label></td>
              </tr>             
            </table>
         </td>
     </tr>
     <tr><td colspan="2" height="5px"></td></tr>
     <tr><td colspan="2" bgcolor="#12b7f5"></td></tr>
     <tr>
         <td colspan="2">
           <div class="myPost">
            <div class="myPost_Theme">
            	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="myPost_Table">
                  <tr class="myPost_Th">
                    <th class="last">照片</th>
                    <th class="last">用户名</th>
                    <th class="last">用户昵称</th>
                    <th class="last">性别</th>
                    <th class="last">被举报次数</th>
                    <th class="last">用户状态</th>
                    <th class="last">操作</th>
                  </tr>
                  <tbody id="user-tbody"></tbody>                   	                   	                                  	
                </table>
            </div>
            </div>
            <div id="bottom" class="pageList">
        	<ul>
        	<li><a href='javascript:selectUser(1)' class="pret">首页</a></li>
            <li><a href="javascript:lastPage()" class="pret">上一页</a></li>
            <li><a href="javascript:nextPage()" class="next">下一页</a></li>
            <li><a href= 'javascript:endPage()' class="pret">末页</a></li>
            <li>当前第<input type="text" id="page" style="height: 30px;width: 30px"  disabled="disabled"/>页</li>
            <li>共<label id="total"></label>页</li>
            </ul>
        </div>
         </td>    
     </tr>
   </table>  
   </div>
   
   <div id="musicmanage" style="display:none ">
    <table width="1090px" style="vertical-align: top">
     <tr align="center">
       <td><div class="header">
         <a href="javascript:first()" class="last">
             <label>用户管理</label>
         </a></div></td>
       <td><div class="header">
         <a href="javascript:last()" class="first">
             <label>曲库管理</label>
       </a></div></td>
     </tr>  
     <tr><td colspan="2" bgcolor="#12b7f5"></td></tr>
     <tr><td colspan="2" height="5px"></td></tr>
     <tr>
         <td colspan="2" height="30px">
            <table width="725" border="0" align="center" cellpadding="0" cellspacing="0">            
               <tr>
                  <td width="5"></td>
                  <td width="60px" height="25" align="center" class="text_cray1">歌曲名称&nbsp;&nbsp;</td>
                  <td width="120px" align="left" class="text_cray1"><label>
                     <input id="musicname" type="text" class="text_cray" style="width:120px">
                     </label></td>
                  <td width="60px" align="right" class="text_cray1">歌曲类别&nbsp;&nbsp;</td>
                  <td width="120px" align="left" class="text_cray1"><label>
                     <input id="style" type="text" class="text_cray" style="width:120px">
                     </label></td>
                 <td width="60px" align="right" class="text_cray1">歌手名称&nbsp;&nbsp;</td>
                 <td width="120px" align="left" class="text_cray1"><label>
                     <input id="singer" type="text" class="text_cray" style="width:120px">          
                     </label></td>   
                 <td width="10px"></td>                            
                 <td  align="left" valign="middle"><label>
                     <input type="button" onclick="selectMusic(1)" value="查询">
                     </label></td>
              </tr>             
            </table>
         </td>
     </tr>
     <tr><td colspan="2" height="5px"></td></tr>
     <tr><td colspan="2" bgcolor="#12b7f5"></td></tr>
     <tr>
         <td colspan="2">
           <div class="myPost">
            <div class="myPost_Theme">
            <table width="100%" cellspacing="0" cellpadding="0">            
              <tr>
                 <td width="70%" valign="top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="myPost_Table">
                      <tr class="myPost_Th">
                        <th class="last"></th>
                        <th class="last" style="width:200px">歌曲名称</th>
                        <th class="last">歌曲类型</th>
                        <th class="last">歌手名称</th>
                        <th class="last">操作</th>
                      </tr>
                      <tbody id="music-tbody"></tbody>                   	                   	                                  	
                   </table>
                 </td>
                 
                 <td width="30%" valign="top">
                    <table height="250px" align="center">
                      <tr><td align="center">
                             <img src="/ktvOnline/images/sing.jpg" id="singbg" width="140px" height="140px">
                               <div id="lyricWrapper" style="border: 2px">
	                              <p style="height: 40px"></p>
                                  <div id="lyricContainer"> </div>
                                  <p style="height: 20px"></p>
                               </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <audio id="audio_id" controls></audio> 
                          </td>
                      </tr>
                    </table>
                 </td>
              </tr>            
            </table>           	
            </div>
            </div>
            <div id="bottom2" class="pageList" style="display: none">
        	<ul>
        	<li><a href='javascript:selectMusic(1)' class="pret">首页</a></li>
            <li><a href="javascript:lastPage2()" class="pret">上一页</a></li>
            <li><a href="javascript:nextPage2()" class="next">下一页</a></li>
            <li><a href= 'javascript:endPage2()' class="pret">末页</a></li>
            <li>当前第<input type="text" id="musicpage" style="height: 30px;width: 30px"  disabled="disabled"/>页</li>
            <li>共<label id="musictotal"></label>页</li>
            </ul>
        </div>
         </td>    
     </tr>
   </table>  
   </div>
  </body>
<script src="/ktvOnline/js/jquery.js" type="text/javascript"></script>
<script src="/ktvOnline/js/adminMain.js" type="text/javascript"></script>
</html>
