var username;
function initHeader(){
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/QueryPrivate',
		dataType : 'json',
		data : {"username" : username},
		success : function(data) {	
			console.log(data);
			$("#username").text(data.username);
			$("#nickname").text(data.nickname);
			$("#photo").attr("src","/ktvOnline/photos/"+data.photo);
			var src="/ktvOnline/images/man.png";
			if(data.sex=="女")
				src="/ktvOnline/images/woman.png";
			$("#sex").attr("src",src);
			$("#centerContent").text(data.centerContent);
		}		
	});    
}
function initMusic(){
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/QueryMusicByUploader',
		dataType : 'json',
		data : {"username" : username},
		success : function(data) {	
			console.log(data);
			var tbody=$("#music_tbody");
			tbody[0].innerHTML="";
			
			if(data.length==0){
				var tr1=document.createElement("tr");
				var tr2=document.createElement("tr");
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				$(td1).attr("colspan","3");
				$(td2).attr("colspan","3");
				$(tr1).attr("height","30px");
				$(tr2).attr("algin","center");
				
				td2.innerHTML="ta还没有上传过歌曲哦！";
				tr1.appendChild(td1);
				tr2.appendChild(td2);
				tbody[0].appendChild(tr1);
				tbody[0].appendChild(tr2);
				return true;
			}
			
			var tr0=document.createElement("tr");	
			var td01=document.createElement("td");
			var td02=document.createElement("td");
			var td03=document.createElement("td");
			$(tr0).attr('class','listSecondFont');
			td01.innerHTML="歌曲名称";
			td02.innerHTML="歌手";
			td03.innerHTML="操作";
			$(td03).attr("colspan","2");
			tr0.appendChild(td01);
			tr0.appendChild(td02);
			tr0.appendChild(td03);
			tbody[0].appendChild(tr0);
			 
			for(var i=0;i<data.length;i++){
				var tr=document.createElement("tr");
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				var td3=document.createElement("td");
				td3.style.position = "relative";
				var src="/ktvOnline/musics/"+data[i].name+".mp3";
				td1.innerHTML=data[i].name;
				td2.innerHTML=data[i].singer;
				td3.innerHTML="<audio src='"+src+"' controls style='width:100px'></audio>"+
				              "<div class='listen-div'><img src='/ktvOnline/images/listen.png' onclick='listen(\""+data[i].name+"\")'></div>";		
				var td4=document.createElement("td");
				 tr.appendChild(td1);
				 tr.appendChild(td2);
				 tr.appendChild(td3);
				 if(flag==1){					
					td4.innerHTML="<a href='javascript:deleteMusic(\""+data[i].name+"\")' class='delete-a'>删除</a>";					
				 }
				 tr.appendChild(td4);
				 tbody[0].appendChild(tr);
			}
		}		
	});  
}
function initRecod(){
	$.ajax({
		type : 'get',
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		url : '/ktvOnline/QueryRecord',
		dataType : 'json',
		data : {"username" : username},
		success : function(data) {	
			console.log(data);
			var tbody=$("#record_tbody");
			tbody[0].innerHTML="";
			
			if(data.length==0){
				var tr1=document.createElement("tr");
				var tr2=document.createElement("tr");
				var td1=document.createElement("td");
				var td2=document.createElement("td");
				$(td1).attr("colspan","3");
				$(td2).attr("colspan","3");
				$(tr1).attr("height","30px");
				$(tr2).attr("algin","center");
				
				td2.innerHTML="ta还没有上传过歌曲哦！";
				tr1.appendChild(td1);
				tr2.appendChild(td2);
				tbody[0].appendChild(tr1);
				tbody[0].appendChild(tr2);
				return true;
			}
			
			for(var i=0;i<data.length;i++){
				var tr=document.createElement("tr");
				var td1=document.createElement("td");
				var td3=document.createElement("td");
				td3.style.position = "relative";
				var src="/ktvOnline/record/"+data[i].record+".wav";
				td1.innerHTML=data[i].record;
				td3.innerHTML="<audio src='"+src+"' controls style='width:100px'></audio>"+
				              "<div class='listen-div'><img style='margin-top:1px' src='/ktvOnline/images/listen.png' onclick='listenRecord(\""+data[i].record+"\")'></div>";
			
				 tr.appendChild(td1);
				 tr.appendChild(td3);
				 if(flag==1){
						var td4=document.createElement("td");
						td4.innerHTML="<a href='javascript:deleteRecord(\""+data[i].record+"\")' class='delete-a'>删除</a>";
						tr.appendChild(td4);
					}
				 tbody[0].appendChild(tr);
			}
		}		
	});  
}
var audio;
function listen(name){
	audio=$("#audio-play")[0];
	audio.src="/ktvOnline/musics/"+name+".mp3";
	audio.controls=true;
	if(audio_record2!=null){
		audio_record2.controls=false;
	}
	audio.play();
	getlrc(name);
	showLrc();
}
var audio_record2;
function listenRecord(name){	
    var songName=name+"_BZ";
    if(!checkSrc(songName))
    	songName=name;
    listen(songName);
    audio_record2=$("#audio-record2")[0];
	audio_record2.src="/ktvOnline/record/"+name+".wav";
	audio.volume = 0.3;
	audio.controls=false;
	audio_record2.controls=true;
	audio_record2.ontimeupdate=function(){
		if(audio_record2.ended){
        	audio.pause();		            	
        	return;
        }
        audio.currentTime=audio_record2.currentTime;
	}
}
function getlrc(name){
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
						
					audio.ontimeupdate=function() {
     	        		var currentTime = audio.currentTime;
			            var beginTime = 0;
			            var endTime = 0;
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
function showLrc(){
	$("#lrc_tbody").show();
	$("#music_tbody").hide();
	$("body").scrollTop(0);
}
function showMusic(){
	$("#lrc_tbody").hide();
	$("#music_tbody").show();
}
function musicUpload(){
	$("#music").click();
}
function bzUpload(){
	$("#music_bz").click();
}
function lrcUpload(){
	$("#music_lrc").click();
}
function submitAll(){
	var music=$("#m_text").val();
	var bz=$("#b_text").val();
	var lrc=$("#l_text").val();
	var style=$("#style_text").val();
	var singer=$("#singer_text").val();
	if(music!=""){
		$.ajaxFileUpload({
		      url : '/ktvOnline/AddMusic',
		      //contentType : 'multipart/form-data',
		      type: 'post',
		      secureuri : false,
		      fileElementId : 'music',
		      data:{"singer":singer,"style":style,"username":username},
		      dataType : 'JSON',
		      success : function (data, status) {
		         if(data=true){
		        	 $("#m_text").val("");															
		        	 $("#style_text").val("");
		        	 $("#singer_text").val("");
		        	 $("#music").after($("#music").clone().val(""));
		        	 $("#music").remove();
		        	 $("#music").on("change", function(){  
		 				$("#m_text").val(getFileName(document.getElementById("music").value));
		     		}); 
		         }else
		        	 alert("上传失败，请稍后重试！");
		      },
		      error : function (data, status, e) {
		    	  alert("无法预测的异常导致您的操作失败，请稍后重试！");
		      }
		    });
	}
	if(bz!=""){
		$.ajaxFileUpload({
		      url : '/ktvOnline/AddMusic',
		      //contentType : 'multipart/form-data',
		      type: 'post',
		      secureuri : false,
		      fileElementId : 'music_bz',
		      data:{"username":username},
		      dataType : 'JSON',
		      success : function (data, status) {
		         if(data=true){
		        	 $("#b_text").val("");
		        	 $("#music_bz").after($("#music_bz").clone().val(""));
		        	 $("#music_bz").remove();
		        	 $("#music_bz").on("change", function(){  
		 				$("#b_text").val(getFileName(document.getElementById("music_bz").value));
		             }); 
		         }else
		        	 alert("上传失败，请稍后重试！");
		      },
		      error : function (data, status, e) {
		    	  alert("无法预测的异常导致您的操作失败，请稍后重试！");
		      }
		    });
	}
	if(lrc!=""){
		$.ajaxFileUpload({
		      url : '/ktvOnline/AddMusic',
		      //contentType : 'multipart/form-data',
		      type: 'post',
		      secureuri : false,
		      fileElementId : 'music_lrc',
		      data:{"username":username},
		      dataType : 'JSON',
		      success : function (data, status) {
		         if(data=true){		        																	
		        	 $("#l_text").val("");
		        	 $("#music_lrc").after($("#music_lrc").clone().val(""));
		        	 $("#music_lrc").remove();
		        	 $("#music_lrc").on("change", function(){  
		 				$("#l_text").val(getFileName(document.getElementById("music_lrc").value));
		             });
		         }else
		        	 alert("上传失败，请稍后重试！");
		      },
		      error : function (data, status, e) {
		    	  alert("无法预测的异常导致您的操作失败，请稍后重试！");
		      }
		    });
	}	
}