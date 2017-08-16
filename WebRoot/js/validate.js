
var etd = $("#td3");
function user_validate(username, td1) {
	etd.css("display", "none");
	var user = $("#" + username).val();
	var utd = $("#" + td1);
	var rep = /^\w{6,30}$/;
	if (user == "") {
		utd.css("display", "table-cell");
		utd.html("*用户名不能为空！");
		return false;
	}
	if (!rep.test(user)) {
		utd.css("display", "table-cell");
		utd.html("*用户名为6~30位！");
		return false;
	}
	utd.css("display", "none");
	return true;
}

function pwd_validate(password, td2) {
	etd.css("display", "none");
	var pwd = $("#" + password).val();
	;
	var ptd = $("#" + td2);
	var rep = /.{6}/;
	if (pwd == "") {
		ptd.css("display", "table-cell");
		ptd.html("*密码不能为空！");
		return false;
	}
	if (!rep.test(pwd)) {
		ptd.css("display", "table-cell");
		ptd.html("*密码不能少于6位");
		return false;
	}
	ptd.css("display", "none");
	return true;
}

function register_username(rusername, rtd1) {
	etd.css("display", "none");
	var user = $("#" + rusername).val();
	var utd = $("#" + rtd1);
	var rep = /^\w{6,30}$/;
	if (user == "") {
		utd.css("display", "table-cell");
		utd.html("*用户名不能为空！");
		return false;
	}
	if (!rep.test(user)) {
		utd.css("display", "table-cell");
		utd.html("*用户名为6~30位！");
		return false;
	}
	$.ajax({	
		type:"post",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		url:"/ktvOnline//CheckNameServlet",
		dataType:"json",
		data:{"username":user},
		success:function(data){			
			if(data==false){
				utd.css("display", "table-cell");
				utd.html("*用户名已存在！");
			}
			else{
				utd.css("display", "none");
			}
		}				
	});	
}

function nick_validate(nickname,rtd2){
	
	var nick=$("#"+nickname).val();
	var ntd = $("#" + rtd2);
	var rep = /^\w{1,12}$/;
	if (nick == "") {
		ntd.css("display", "table-cell");
		ntd.html("*昵称不能为空！");
		return false;
	}
	if (!rep.test(nick)) {
		ntd.css("display", "table-cell");
		ntd.html("*昵称不能超过12位！");
		return false;
	}
	ntd.css("display", "none");
	return true;
}

function passwordAgin(pwd1,pwd2,rtd4){
	
	var pwd1=$("#"+pwd1).val();
	var pwd2=$("#"+pwd2).val();
	var ptd=$("#"+rtd4);
	if(pwd1!=pwd2){
		ptd.css("display","table-cell");
		ptd.html("*两次密码输入不一致，请再次确认！");
		return false;
	}
	ptd.css("display","none");
	return true;
}

function check_button(register_button,agreement){
	var flag=$("#"+agreement).get(0).checked;
	var rbutton=$("#"+register_button);
	if(flag){
		rbutton.attr("disabled",false);
	}else
		rbutton.attr("disabled","disabled");
		
}

function checkall(username,td1,password,td2) {
	etd.css("display", "none");
	if(!user_validate(username,td1)){
		return false;
	}
	if(!pwd_validate(password,td2)){
		return false;
	}
	return true;
}

function checkregister(){

	if(!nick_validate("nickname","rtd2")){
		return false;
	}
	
	if(!pwd_validate("rpassword","rtd3")){
		return false;
	}
	if(!passwordAgin("rpassword","rpassword2","rtd4")){		
		return false;
	}
	return true;
}