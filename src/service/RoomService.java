package service;

import java.util.List;

import dao.RoomDao;
import javabean.RoomInfo;

public class RoomService {

	RoomDao dao=new RoomDao();
	
	public String createRoom(RoomInfo room){
		String result="";
		result=dao.createRoom(room);
		return result;
	}
	
	public boolean deleteRoom(String roomid){
		
		boolean result=false;
		result=dao.deleteRoom(roomid);
		return result;
	}
	
	public List<RoomInfo> queryRoom(){
		return dao.queryRoom();
	}
	public int validatePwd(String roomid,String roompwd){
		return dao.validatePwd(roomid, roompwd);
	}
	public List<RoomInfo> queryRoomByName(String name){
		return dao.queryRoomByName(name);
	}
}
