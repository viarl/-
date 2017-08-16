package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import commom.JdbcUtil;

import javabean.Record;
import javabean.UserInfo;

public class RecordDao {

	public List<Record> queryRecord(String username){
		
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		List<Record> list=new ArrayList<Record>();

		try {
			st = con.prepareStatement("select record,music from record where username=?");
			st.setString(1, username);

			rs = st.executeQuery();

			while(rs.next()) {

				Record r=new Record();
				r.setRecord(rs.getString("record"));
				r.setMusic(rs.getString("music"));
				
				list.add(r);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}				
		return list;
	}
	
	public boolean addRecord(Record record){
		Connection con = null;
		PreparedStatement st = null;
		con = JdbcUtil.getConnection();

		boolean r=false;

		try {
			st = con.prepareStatement("insert into record(username,record,music) values(?,?,?)");
			st.setString(1, record.getUsername());
			st.setString(2, record.getRecord());
			st.setString(3, record.getMusic());
			
			int i=st.executeUpdate();
            if(i==1)
            	r=true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}				
		return r;
	}
	public boolean privateDeleteRecord(String songName,String username){
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		boolean r=false;
		try {
			st = con.prepareStatement("delete from record where record=? and username=?");

			st.setString(1,songName);
			st.setString(2,username);
            int i=st.executeUpdate();
            
            if(i==1)
            	r=true;
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}	
		return r;
	}
}
