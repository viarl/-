package servlet;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CopyOnWriteArraySet;

import javabean.Friends;
import javabean.MusicInfo;
import javabean.RoomInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import commom.Json;
import commom.RoomChange;
import commom.RoomUtil;

import service.FriendService;
import service.MusicService;
import service.RoomService;
import service.UserService;

public class RoomServlet extends WebSocketServlet {

	private HashMap<String, String> user = new HashMap<String, String>();	
	private HashMap<String,Set<String>> rooms=RoomUtil.rooms;
	private HashMap<String,Set<ChatWebSocket>> roomConns=new HashMap<String,Set<ChatWebSocket>>();
	private HashMap<String,List<Map<String,String>>> musicLists=new HashMap<String,List<Map<String,String>>>();
	private HashMap<String, String> inRoom = new HashMap<String, String>();	
	private HashMap<String, String> playing=RoomUtil.playing;
		
	@Override
	protected StreamInbound createWebSocketInbound(String arg0,
			HttpServletRequest arg1) {
		// TODO Auto-generated method stub
		return new ChatWebSocket();
	}

	private class ChatWebSocket extends MessageInbound {
				
		private String username;
		private String roomid;
		private String roomname;
		private String nickname;
		private String num;

		@Override
		protected void onClose(int status) {

			roomConns.get(roomid).remove(this);
	    	user.remove(username);
	    		    	
	    	if (inRoom.get(username) != null) {
				int n=rooms.get(roomid).size();
				Iterator<String> it = rooms.get(roomid).iterator();
				rooms.get(roomid).remove(username);
				inRoom.remove(username);
				playing.remove(roomid);

				sendList(nickname + "退出了房间");
				System.out.println(username + "退出了房间：" + roomid);						
				
				for(int i=0;i<musicLists.get(roomid).size();i++){
					if(musicLists.get(roomid).get(i).get("username").equals(username)){							
						musicLists.get(roomid).remove(i);	
						if(i==0){
							next("Start");
						}
						i--;
					}
				}
				
				RoomService service = new RoomService();

				if (rooms.get(roomid).size() == 0) {
					rooms.remove(roomid);
					boolean r=service.deleteRoom(roomid);
					RoomChange.changes.firePropertyChange("num",0,n);
				} else{	
					//不是很理解，为啥1-next(),2-sendAll()没问题，但是1-sendAll(),2-next()会出异常
					//next("Start");	
					RoomChange.changes.firePropertyChange("num",rooms.get(roomid).size(),n);
					sendAll(musicList(), roomid);
				}
								
	    	}
	    	/*try {
				timer.schedule(new timeTask(), seconds);
				
			} catch (Exception e) {							
			}	*/			  
		}

		@Override
		protected void onOpen(WsOutbound outbound) {			
			System.out.println(rooms);
		}

		@Override
		protected void onBinaryMessage(ByteBuffer data) throws IOException {
			for(ChatWebSocket conn:roomConns.get(roomid)){
				if(!conn.username.equals(this.username))
					conn.getWsOutbound().writeBinaryMessage(data);
			}
		}

		@Override
		protected void onTextMessage(CharBuffer message) throws IOException {
			onMessage(message.toString());
		}

		private void onMessage(String data) {

			JSONObject jsonObject =  JSONObject.parseObject(data);   
	        String action = jsonObject.getString("action");
	        
	        switch(action){
	        
	        case "Room":
	        	
	        	roomid=jsonObject.getString("roomid");
	        	roomname=jsonObject.getString("roomname");
	        	username=jsonObject.getString("username");
	        	nickname=jsonObject.getString("nickname");
	        	num=jsonObject.getString("num");
	        		    	        			        		
	        	user.put(username, nickname);	
				if(rooms.get(roomid)!=null){
					int n=rooms.get(roomid).size();
					rooms.get(roomid).add(username);
					roomConns.get(roomid).add(this);
					RoomChange.changes.firePropertyChange("num",rooms.get(roomid).size(),n);
				}else{
					RoomInfo roominfo=new RoomInfo();
					Set<ChatWebSocket> conns = new CopyOnWriteArraySet<ChatWebSocket>();					
					Set<String> users=new CopyOnWriteArraySet<String>();
					List<Map<String,String>> musicList=new ArrayList<Map<String,String>>();
					
					users.add(username);
					rooms.put(roomid, users);
					musicLists.put(roomid, musicList);
					conns.add(this);
					roomConns.put(roomid, conns);	
					playing.put(roomid, "0");
					RoomChange.changes.firePropertyChange("num",0,1);
				}
				String m="";
				if(inRoom.get(username)==null){
					m=nickname+"进入了房间";
				    System.out.println(nickname+"进入了房间："+roomid);
				}

				CharBuffer md = CharBuffer.wrap(musicList());
				try {
					this.getWsOutbound().writeTextMessage(md);	
					sendList(m);
				} catch (IOException e) {
					e.printStackTrace();
				}			
				inRoom.put(username, "1");
	        	break;
	        	
			case "Select":

				MusicInfo music = new MusicInfo();
				music.setName(jsonObject.getString("name"));
				music.setStyle(jsonObject.getString("style"));
				music.setSinger(jsonObject.getString("singer"));
				music.setHost(jsonObject.getString("host"));
				MusicService service = new MusicService();
				Map<String, Object> r = service.queryMusic(music,
						jsonObject.getInteger("page"));
				Json j = new Json();
				j.setAction("Result");
				j.setData(r);

				String json = JSON.toJSONString(j);
				sendAll(json, roomid);
				break;
        
			case "Choose":
				
				String songname=jsonObject.getString("songname");
				MusicService service_host=new MusicService();
				service_host.addHost(songname);
				Map<String,String> map=new HashMap<String, String>();
				map.put("username", username);
				map.put("songname", songname);
				map.put("action", "Choose");

				if(musicLists.get(roomid).size()==0)
					try {
						Map<String,String> un=new HashMap<String, String>();
						un.put("action", "Unlock");
						this.getWsOutbound().writeTextMessage(CharBuffer.wrap(JSON.toJSONString(un)));
					} catch (IOException e1) {
						e1.printStackTrace();
					}
				musicLists.get(roomid).add(map);
				String json_host = JSON.toJSONString(map);
				sendAll(json_host, roomid);
				break;
				
			case "DeleteMusicList":
				String delname=jsonObject.getString("songname");
				int n=musicLists.get(roomid).size();
				for(int i=0;i<n;i++)					
					if(musicLists.get(roomid).get(i).get("username").equals(username)&&
				    	musicLists.get(roomid).get(i).get("songname").equals(delname)){
						   musicLists.get(roomid).remove(i);
						   break;
					}	
				sendAll(musicList(), roomid);
				break;
				
			case "Start":				
				next("Start"); 
				playing.put(roomid, "1");
				RoomChange.changes.firePropertyChange("num","0","1");
				break;
				
            case "Next":
            	next("Next");           	
				break;
				
            case "sdp":
            case "candidate":
            	for(ChatWebSocket conn:roomConns.get(roomid)){
    				try {	
    					if(!conn.username.equals(this.username)){
    						CharBuffer d = CharBuffer.wrap(data);
        					conn.getWsOutbound().writeTextMessage(d);
    					}   					
    				} catch (IOException e) {
    					e.printStackTrace();
    				}
    		    }
            	break; 
            	
            case "Text":
            	for(ChatWebSocket conn:roomConns.get(roomid)){
    				try {	
    					if(!conn.username.equals(this.username)){
    						CharBuffer d = CharBuffer.wrap(data);
        					conn.getWsOutbound().writeTextMessage(d);
    					}   					
    				} catch (IOException e) {
    					e.printStackTrace();
    				}
    		    }
            	break;
        }
	}
	
		private void next(String flag) {
			String startSong="";
			String singerName="";
			if(flag.equals("Next")&&musicLists.get(roomid).size()>0){
				musicLists.get(roomid).remove(0);
				if(musicLists.get(roomid).size()>0){
					startSong=musicLists.get(roomid).get(0).get("songname");
					singerName=musicLists.get(roomid).get(0).get("username");
					musicLists.get(roomid).get(0).put("action", "nowPlay");
				}
			}
			
			if(flag.equals("Start")&&musicLists.get(roomid).size()>0){
				startSong=musicLists.get(roomid).get(0).get("songname");
				singerName=musicLists.get(roomid).get(0).get("username");
				musicLists.get(roomid).get(0).put("action", "nowPlay");
			}
			try {
				sendStart(singerName,flag,startSong);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	private String musicList(){
		HashMap<String, Object> data=new HashMap<String,Object>();
		data.put("action", "ShowMusicList");
		data.put("data", musicLists.get(roomid));
		return JSON.toJSONString(data);
	}	
		
	private void sendStart(String username,String action,String songname) throws IOException{
		HashMap<String, Object> data=new HashMap<String,Object>();
		data.put("action", action);
		data.put("song", songname);
				
		if(username.equals("")){
			for(ChatWebSocket conn:roomConns.get(roomid)){
				data.put("from", 0);
				CharBuffer d = CharBuffer.wrap(JSON.toJSONString(data));
				conn.getWsOutbound().writeTextMessage(d);
			}
			playing.put(roomid, "0");
			RoomChange.changes.firePropertyChange("num","1","0");
			return;
		}
		for(ChatWebSocket conn:roomConns.get(roomid)){
			if(conn.username.equals(this.username))
				data.put("from", 1);
			else
				data.put("from", 0);
			
			if(conn.username.equals(username)){					
				data.put("lockflag", "1");
				data.put("from", 1);
				CharBuffer d = CharBuffer.wrap(JSON.toJSONString(data));
				conn.getWsOutbound().writeTextMessage(d);
			}
			else{
				data.put("lockflag", "0");
				data.put("musicList", musicLists.get(roomid));
				CharBuffer d = CharBuffer.wrap(JSON.toJSONString(data));
				conn.getWsOutbound().writeTextMessage(d);
			}
			
	    }
	}
	
	private void sendAll(String message,String roomid){		
		for(ChatWebSocket conn:roomConns.get(roomid)){
				try {	
					CharBuffer d = CharBuffer.wrap(message);
					conn.getWsOutbound().writeTextMessage(d);
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
		}
	
	private void sendList(String a){
		
		HashMap<String, Object> data=new HashMap<String,Object>();
		data.put("action", "List");
		data.put("flag", a);
		Map<String,String> u=new HashMap<String, String>();
		Iterator<String> it = rooms.get(roomid).iterator();
		while(it.hasNext()) {
			String n=it.next();
			u.put(""+n,user.get(n));
		}
		data.put("map", u);
		sendAll(JSON.toJSONString(data),roomid);
	}
	
		// 计时器设置下线延迟1s
		private Timer timer = new Timer();
		private final int seconds = 1000;

		private class timeTask extends TimerTask {
			// 标识flag
			int flag = 0;

			@Override
			public void run() {

				// 检查是否重连，若重连设置flag=1
				if (user.get(username) != null)
					flag = 1;
				// flag=0时表明用户以离开，执行下线
				if (flag == 0) {
					if (inRoom.get(username) != null) {
						int n=rooms.get(roomid).size();
						Iterator<String> it = rooms.get(roomid).iterator();
						rooms.get(roomid).remove(username);
						inRoom.remove(username);

						sendList(nickname + "退出了房间");
						System.out.println(username + "退出了房间：" + roomid);						
						
						for(int i=0;i<musicLists.get(roomid).size();i++){
							if(musicLists.get(roomid).get(i).get("username").equals(username)){							
								musicLists.get(roomid).remove(i);	
								if(i==0){
									next("Start");
								}
								i--;
							}
						}
						RoomService service = new RoomService();

						if (rooms.get(roomid).size() == 0) {
							rooms.remove(roomid);
							boolean r=service.deleteRoom(roomid);							
						} else{	
							//不是很理解，为啥1-next(),2-sendAll()没问题，但是1-sendAll(),2-next()会出异常
							//next("Start");	
							sendAll(musicList(), roomid);
						}
						
						RoomChange.changes.firePropertyChange("num",rooms.get(roomid).size(),n);
					}
				} else {
					sendList("");
				}
			}
		}
	}	        
}
