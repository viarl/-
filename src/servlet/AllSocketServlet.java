package servlet;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CopyOnWriteArraySet;

import javabean.Friends;
import javabean.RoomInfo;
import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;

import com.alibaba.fastjson.JSON;
import commom.RoomChange;

import service.FriendService;
import service.RoomService;
import service.UserService;

public class AllSocketServlet extends WebSocketServlet {

	private final HashMap<String, String> users = new HashMap<String, String>();
	private Set<ChatWebSocket> conns = new CopyOnWriteArraySet<ChatWebSocket>();
	private HashMap<String, String> photos = new HashMap<String, String>();	
		
	@Override
	protected StreamInbound createWebSocketInbound(String arg0,
			HttpServletRequest arg1) {
		// TODO Auto-generated method stub
		return new ChatWebSocket(users);
	}

	private class ChatWebSocket extends MessageInbound {

		private HashMap<String, String> users = new HashMap<String, String>();				
		private String username;
		PropertyChangeListener pcl=new PropertyChangeListener() {  
			  @Override  
			  public void propertyChange(PropertyChangeEvent evt) {  
			  // TODO Auto-generated method stub  
			    sendRoom();
			  }  
		};

		public ChatWebSocket(HashMap<String, String> users) {
			this.users = users;				
			RoomChange.addPropertyChangeListener(pcl);			
		}

		@Override
		protected void onClose(int status) {

			conns.remove(this);
			
			//��ֹ�û�ˢ�£�����webSocket���ߣ����ö�ʱ��1.5s�����Ƿ�����
			try {
				timer.schedule(new timeTask(), seconds);
				
			} catch (Exception e) {			
				//���ڹ���ˢ�µ������ӳ�ͻʹ�����߳����쳣ʱ�Ĵ���
				UserService uservice = new UserService();
				boolean a = uservice.updateFlag(username, "1");
				if (a) {

					FriendService fservice = new FriendService();
					// ��ѯ��user��friends
					List<Friends> result = fservice.friendsQuery(username);

					// ���user�����ߺ��ѷ�����Ϣ��ˢ��������б�
					sendList(result,fservice);

					try {
						// ���user���ͺ����б�list
						StringBuilder jsonString = new StringBuilder();
						jsonString.append(JSON.toJSONString(result));
						CharBuffer json = CharBuffer.wrap("Json:" + jsonString);
						this.getWsOutbound().writeTextMessage(json);
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					System.out.println(username  + "  ������");
				} else {
				}
			}			
		}

		@Override
		protected void onOpen(WsOutbound outbound) {
			conns.add(this);
			sendRoom();
		}

		@Override
		protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
			// TODO Auto-generated method stub

		}

		@Override
		protected void onTextMessage(CharBuffer message) throws IOException {
			System.out.println(message.toString());
			onMessage(message.toString());
		}

		private void onMessage(String data) {

			String[] msg = data.split(":");
			String s = data.substring(msg[0].length() + 1, data.length());
			
			switch(msg[0]){
			     case "Tourist":
			    	    String[] names = s.split("_");
						this.username = names[0];			    	 
				        break;
				        
			     case "Name":			    	 
			    	    String[] name = s.split("_");
						users.put(name[0], name[1]);
						this.username = name[0];

						Iterator iter = users.entrySet().iterator();
						while (iter.hasNext()) {
							Map.Entry entry = (Map.Entry) iter.next();
							Object key = entry.getKey();
							Object val = entry.getValue();
						}

						// ����Ϊ������
						UserService uservice = new UserService();						
						boolean a = uservice.updateFlag(username, "1");

						if (a) {

							String photo=uservice.photoQueryByName(username);
							photos.put(username, photo);
							
							FriendService fservice = new FriendService();
							// ��ѯ��user��friends
							List<Friends> result = fservice.friendsQuery(username);

							// ���user�����ߺ��ѷ�����Ϣ��ˢ��������б�
							sendList(result,fservice);

							try {
								// ���user���ͺ����б�list
								StringBuilder jsonString = new StringBuilder();
								jsonString.append(JSON.toJSONString(result));
								CharBuffer json = CharBuffer.wrap("Json:" + jsonString);
								this.getWsOutbound().writeTextMessage(json);
							} catch (IOException e) {
								e.printStackTrace();
							}

							System.out.println(username + "   " + name[1] + "  ������");

						} else {

						}			    	 
				     break;
				     
			     case "Add":			    	 
			    	 String friendName=s;
						CharBuffer flag = CharBuffer.wrap("AddReq:"+username+"_"+users.get(username));
						for (ChatWebSocket u : conns){
							if(u.username.equals(friendName))
								try {
									u.getWsOutbound().writeTextMessage(flag);
									break;
								} catch (IOException e) {
				
									try {
										flag = CharBuffer.wrap("AddRsp:0");
										this.getWsOutbound().writeTextMessage(flag);
									} catch (IOException e1) {
										e1.printStackTrace();
									}
								}
						}
						flag = CharBuffer.wrap("AddRsp:1");
						try {
							this.getWsOutbound().writeTextMessage(flag);
						} catch (IOException e) {
							e.printStackTrace();
						}							    	 
				     break;
				     
			     case "Sure":			    	 
			    	 String newFriendName=s;
			    	 FriendService fservice = new FriendService();
			    	 boolean r=fservice.addFriend(username, newFriendName);
			    	 if(r){
			    		 List<Friends> result = fservice.friendsQuery(username);
			    		 
			    		 try {
								// ���user���ͺ����б�list
								StringBuilder jsonString = new StringBuilder();
								jsonString.append(JSON.toJSONString(result));
								CharBuffer json = CharBuffer.wrap("Json:" + jsonString);
								this.getWsOutbound().writeTextMessage(json);
							} catch (IOException e) {
								e.printStackTrace();
							}
			    		 
			    		 sendToFriend(fservice,newFriendName);
			    		 
			    	 }else{
			    		 CharBuffer error = CharBuffer.wrap("Error:�޷�Ԥ����쳣�������Ĳ���ʧ�ܣ����Ժ����ԣ�");
						 try {
							this.getWsOutbound().writeTextMessage(error);
						} catch (IOException e) {
							e.printStackTrace();
						}
			    	 }
			    	 
				     break;
				     
			     case "Del":
						FriendService fservice2 = new FriendService();
						boolean re = fservice2.deleteFriend(username, s);
						if (re == true) {

							try {
								List<Friends> result = fservice2.friendsQuery(username);
								StringBuilder jsonString = new StringBuilder();
								jsonString.append(JSON.toJSONString(result));
								CharBuffer json = CharBuffer.wrap("Json:" + jsonString);
								this.getWsOutbound().writeTextMessage(json);
								sendToFriend(fservice2, s);

							} catch (IOException e) {
								e.printStackTrace();
							}
						} else {
							CharBuffer error = CharBuffer
									.wrap("Error:�޷�Ԥ����쳣�������Ĳ���ʧ�ܣ����Ժ����ԣ�");
						}
						break;
				     
			     case "Text":
			    	 String[] text=s.split("_");
			    	 String toName=text[0];			    	 			    	 
			    	 
			    	 for(ChatWebSocket u : conns){
			    		 if(u.username.equals(toName)){
			    			 CharBuffer rs = CharBuffer.wrap("Text:"+username+"_"+photos.get(username)+"_"+text[1]);
								try {
									u.getWsOutbound().writeTextMessage(rs);
									break;
								} catch (IOException e) {
									e.printStackTrace();
								}
			    		 }
			    	 }
			    	 break;
			    	 
			     case "Rooms":			    	 
			    	 sendRoom();			    	 
			    	 break;				   
			    	 
			     case "SelectRoomByName":
			    	 sendRoomByName(s);
			    	 break;
				 default:
					 break;
			}			
		}
		
		private void sendRoomByName(String name){
			
			RoomService rservice=new RoomService();
	    	 List<RoomInfo> roomlist=rservice.queryRoomByName(name);
	    	 for(ChatWebSocket u : conns){
	    			 CharBuffer rs = CharBuffer.wrap("RoomsByName:"+JSON.toJSONString(roomlist));
						try {
							u.getWsOutbound().writeTextMessage(rs);
						} catch (IOException e) {
							e.printStackTrace();
						}
	    	 }
		}
		private void sendRoom(){
			RoomService rservice=new RoomService();
	    	 List<RoomInfo> roomlist=rservice.queryRoom();
	    	 for(ChatWebSocket u : conns){
	    			 CharBuffer rs = CharBuffer.wrap("Rooms:"+JSON.toJSONString(roomlist));
						try {
							u.getWsOutbound().writeTextMessage(rs);
						} catch (IOException e) {
							e.printStackTrace();
						}
	    	 }
		}

		private void sendList(List<Friends> result,FriendService fservice) {
			
			for (Friends f : result) {
				String flag1 = f.getFriendflag();
				if (flag1.equals("1")) {
					String fname = f.getFriendname();
					for (ChatWebSocket u : conns) {
						try {
							if (u.username.equals(fname)) {
								List<Friends> list = fservice
										.friendsQuery(fname);
								StringBuilder jsonString = new StringBuilder();
								jsonString.append(JSON.toJSONString(list));
								CharBuffer json = CharBuffer.wrap("Json:"
										+ jsonString);
								u.getWsOutbound().writeTextMessage(json);
							}
							// u.getWsOutbound().writeTextMessage("aa");
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		
		private void sendToFriend(FriendService fservice,String fname) {

					for (ChatWebSocket u : conns) {
						try {
							if (u.username.equals(fname)) {
								List<Friends> list = fservice
										.friendsQuery(fname);
								StringBuilder jsonString = new StringBuilder();
								jsonString.append(JSON.toJSONString(list));
								CharBuffer json = CharBuffer.wrap("Json:"
										+ jsonString);
								u.getWsOutbound().writeTextMessage(json);
								break;
							}
							// u.getWsOutbound().writeTextMessage("aa");
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
		}

		// ��ʱ�����������ӳ�1s
		private Timer timer = new Timer();
		private final int seconds = 1000;

		private class timeTask extends TimerTask {

			//��ʶflag
			int flag = 0;
			
			@Override
			public void run() {
				
				FriendService fservice = new FriendService();
				//����Ƿ�����������������flag=1
				for (ChatWebSocket u : conns) {
					if (username.equals(u.username)) {
						flag = 1;
						break;
					}
				}
				
				//flag=0ʱ�����û����뿪��ִ������
				if (flag == 0)
					if (users.get(username) != null) {
						users.remove(username);

						UserService uservice = new UserService();
						boolean a = uservice.updateFlag(username, "0");

						if (a) {
							
							photos.remove(username);
							// ���user�����ߺ��ѷ�����Ϣ��ˢ��������б�
							List<Friends> result = fservice
									.friendsQuery(username);
							sendList(result,fservice);
							System.out.println(username + "������");
						} else {

						}
					}
			}

		}
	}
}
