package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javabean.Friends;

import commom.JdbcUtil;

public class FriendDao {

	public List<Friends> friendsQuery(String username){
		
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		con=JdbcUtil.getConnection();
		List<Friends> result=new ArrayList<Friends>();
		
		
		try {
			st = con.prepareStatement("select friendname,fnickname,friendflag from vfriends where username=?"+
	                                  " union all "+
	                                  "select username as friendname,nickname as fnickname,userflag as friendflag from vfriends where friendname=?"+
	                                  "order by friendflag desc,fnickname");
			st.setString(1, username);
			st.setString(2, username);

			rs = st.executeQuery();	
			
			while (rs.next()) {
				
				Friends f=new Friends();
				f.setUsername(username);
				f.setFriendname(rs.getString("friendname"));
				f.setFnickname(rs.getString("fnickname"));
				f.setFriendflag(rs.getString("friendflag"));

				result.add(f);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}		
		return result;	
	}
	
	public boolean addFriend(String username,String friendname){
		
		boolean result=false;
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		
		try {
			
			st = con.prepareStatement("insert into friends(username,friendname) values(?,?)");
			st.setString(1, username);
			st.setString(2, friendname);
			
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
	
	public boolean deleteFriend(String username,String friendname){
		
		boolean result=false;
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		
		try {
			
			st = con.prepareStatement("delete from friends where (username=? and friendname=?) or (username=? and friendname=?)");
			st.setString(1, username);
			st.setString(2, friendname);
			st.setString(3, friendname);
			st.setString(4, username);
			
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
}
