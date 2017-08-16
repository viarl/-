package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import commom.JdbcUtil;
import commom.Md5Utils;
import commom.RoomUtil;

import javabean.RoomInfo;

public class RoomDao {

	public String createRoom(RoomInfo room){
		
		String result="";
		Connection con=null;
		ResultSet rs=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		
		String sql="insert into roominfo(roomname,num,pwd,src) values(?,?,?,?) ";
		
		try {
			st = con.prepareStatement(sql);
			st.setString(1, room.getRoomname());
			st.setString(2, room.getNum());
			st.setString(3, room.getPwd());
			st.setString(4, room.getSrc());

			int i=st.executeUpdate();
						
			if(i==1){
				sql="select LAST_INSERT_ID()";
				st=con.prepareStatement(sql);
				rs=st.executeQuery();
				if(rs.next())
				   result=rs.getString(1);				
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs,st,con);
		}		
		return result;			
	}
	
	public boolean deleteRoom(String roomid){
		
		boolean result=false;
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		
		try {
			
			st = con.prepareStatement("delete from roominfo where id=?");
			st.setString(1, roomid);
			
			int i=st.executeUpdate();
			if(i==1)
				result=true;
			
		}catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}	
		
		return result;
	}
	
	public List<RoomInfo> queryRoom(){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();
		
		List<RoomInfo> rooms=new ArrayList<RoomInfo>();

		try {
			st = con.prepareStatement("select id,roomname,num,pwd,src from roominfo order by id desc");

			rs = st.executeQuery();

			while (rs.next()) {
				RoomInfo room=new RoomInfo();
				room.setId(rs.getString("id"));
				room.setRoomname(rs.getString("roomname"));
				int n=0;
				if(RoomUtil.rooms.get(room.getId())!=null)
					n=RoomUtil.rooms.get(room.getId()).size();
				room.setNum("("+n+"/"+rs.getString("num")+")");
				if(rs.getString("pwd").equals(""))
				    room.setPwd("0");
				else
					room.setPwd("1");
				room.setSrc(rs.getString("src"));
				room.setPlaying(RoomUtil.playing.get(room.getId()));
				rooms.add(room);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return rooms;
	}
	
	public int validatePwd(String roomid,String roompwd){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();
		
		int r=0;

		try {
			st = con.prepareStatement("select num from roominfo where id=? and pwd=?");

			st.setString(1, roomid);
			st.setString(2, roompwd);
			rs = st.executeQuery();

			if (rs.next()) {
				r=rs.getInt("num");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return r;
	}
	
	public List<RoomInfo> queryRoomByName(String name){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();
		
		List<RoomInfo> rooms=new ArrayList<RoomInfo>();

		try {
			st = con.prepareStatement("select id,roomname,num,pwd,src from roominfo where roomname like ? order by id desc");

			st.setString(1, "%" + name + "%");
			rs = st.executeQuery();

			while (rs.next()) {
				RoomInfo room=new RoomInfo();
				room.setId(rs.getString("id"));
				room.setRoomname(rs.getString("roomname"));
				int n=0;
				if(RoomUtil.rooms.get(room.getId())!=null)
					n=RoomUtil.rooms.get(room.getId()).size();
				room.setNum("("+n+"/"+rs.getString("num")+")");
				if(rs.getString("pwd").equals(""))
				    room.setPwd("0");
				else
					room.setPwd("1");
				room.setSrc(rs.getString("src"));
				room.setPlaying(RoomUtil.playing.get(room.getId()));
				rooms.add(room);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return rooms;
	}
}
