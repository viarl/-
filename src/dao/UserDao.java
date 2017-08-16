package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import commom.JdbcUtil;
import commom.Md5Utils;
import commom.PageUtil;

import javabean.Friends;
import javabean.UserInfo;

public class UserDao {

	public String Login(UserInfo user) {

		String result = "3";
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		try {
			st = con.prepareStatement("select power from user_info where username=? and pwd=?");
			st.setString(1, user.getUsername());
			st.setString(2, user.getPwd());

			rs = st.executeQuery();

			if (rs.next()) {
				result = rs.getString("power");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return result;
	}
	
    public boolean checkLock(String username){
    	Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		boolean r=false;

		try {
			st = con.prepareStatement("select locku from user_info where username=?");
			st.setString(1, username);

			rs = st.executeQuery();

			if (rs.next()) {

				String lock=rs.getString("locku");
				if(lock.equals("0"))
					r=true;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return r;
	}

	public UserInfo userQueryByName(String username) {

		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		UserInfo user = null;

		try {
			st = con.prepareStatement("select username,nickname,sex,photo,content,centerContent from user_info where username=?");
			st.setString(1, username);

			rs = st.executeQuery();

			if (rs.next()) {

				user = new UserInfo();

				user.setUsername(rs.getString("username"));
				user.setNickname(rs.getString("nickname"));
				user.setSex(rs.getString("sex"));
				user.setPhoto(rs.getString("photo"));
				user.setContent(rs.getString("content"));
				user.setCenterContent(rs.getString("centerContent"));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return user;
	}

	public boolean Register(UserInfo user) {

		boolean result = false;
		Connection con = null;
		PreparedStatement st = null;
		con = JdbcUtil.getConnection();

		try {
			st = con.prepareStatement("insert into user_info(username,pwd,nickname,sex,content,photo,power) values(?,?,?,?,?,?,?) ");
			st.setString(1, user.getUsername());
			st.setString(2, Md5Utils.md5(user.getPwd()));
			st.setString(3, user.getNickname());
			st.setString(4, user.getSex());
			st.setString(5, user.getContent());
			st.setString(6, user.getPhoto());
			st.setString(7, user.getPower());

			int i = st.executeUpdate();
			if (i == 1)
				result = true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}
		return result;
	}

	public boolean checkUser(String username) {

		boolean result = false;
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;

		con = JdbcUtil.getConnection();
		try {
			st = con.prepareStatement("select count(*) from user_info where username=?");
			st.setString(1, username);

			rs = st.executeQuery();

			if (rs.next())
				if (rs.getInt(1) == 0)
					result = true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}

		return result;
	}

	public boolean updateFlag(String username, String flag) {

		Connection con = null;
		PreparedStatement st = null;
		con = JdbcUtil.getConnection();
		boolean result = false;

		String sql = "update user_info set onlineflag=? where username=?";

		try {

			st = con.prepareStatement(sql);
			st.setString(1, flag);
			st.setString(2, username);

			int a = st.executeUpdate();
			if (a == 1)
				result = true;

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}

		return result;
	}

	public List<UserInfo> queryFriendByNickName(String nickname, String username) {

		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		List<UserInfo> friends = new ArrayList<UserInfo>();

		try {
			st = con.prepareStatement("select username,nickname,onlineflag from user_info where nickname like ? and username<>?");
			st.setString(1, "%" + nickname + "%");
			st.setString(2, username);

			rs = st.executeQuery();

			while (rs.next()) {

				UserInfo user = new UserInfo();

				user.setUsername(rs.getString("username"));
				user.setNickname(rs.getString("nickname"));
				user.setOnlineflag(rs.getString("onlineflag"));

				friends.add(user);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return friends;
	}

	public int UserUpdate(UserInfo user) {
		Connection con = null;
		PreparedStatement st = null;
		int result = 0;

		String sql="";
		if(user.getPhoto()!=null&&!user.getPhoto().equals(""))
			sql="update user_info set photo=?,sex=?,nickname=?,content=? where username=?";
		else
			sql="update user_info set sex=?,nickname=?,content=? where username=?";
		con = JdbcUtil.getConnection();
		try {
			st = con.prepareStatement(sql);

			int index=1;
			if(user.getPhoto()!=null&&!user.getPhoto().equals(""))
			    st.setString(index++, user.getPhoto());				
			st.setString(index++, user.getSex());
			st.setString(index++, user.getNickname());
			st.setString(index++, user.getContent());
			st.setString(index++, user.getUsername());

			result = st.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}
		return result;
	}

	public String photoQueryByName(String username) {

		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		String photo = "";

		try {
			st = con.prepareStatement("select photo from user_info where username=?");
			st.setString(1, username);

			rs = st.executeQuery();

			if (rs.next()) {

				photo = rs.getString("photo");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return photo;
	}

	public List<UserInfo> queryUserList(UserInfo user, int startPosition) {
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		List<UserInfo> users = new ArrayList<UserInfo>();

		StringBuilder sql = new StringBuilder(
				"select username,nickname,sex,photo,tip,locku from user_info where power<>0");
		if (user.getUsername() != null && !user.getUsername().equals(""))
			sql.append(" and username like ?");

		if (user.getNickname() != null && !user.getNickname().equals(""))
			sql.append(" and nickname like ?");

		if (!user.getLock().equals("2"))
			sql.append(" and locku=?");

		sql.append(" and tip>=?");
		sql.append(" limit ?,?");

		try {
			st = con.prepareStatement(sql.toString());

			int index = 1;
			if (user.getUsername() != null && !user.getUsername().equals("")) {

				st.setString(index++, "%" + user.getUsername() + "%");
			}
			if (user.getNickname() != null && !user.getNickname().equals("")) {

				st.setString(index++, "%" + user.getNickname() + "%");
			}
			if (!user.getLock().equals("2")) {

				st.setString(index++, user.getLock());
			}

			st.setInt(index++, user.getTip());
			st.setInt(index++, startPosition);
			st.setInt(index++, PageUtil.PAGE_SIZE);

			rs = st.executeQuery();

			while (rs.next()) {
				UserInfo u = new UserInfo();
				u.setUsername(rs.getString("username"));
				u.setNickname(rs.getString("nickname"));
				u.setSex(rs.getString("sex"));
				u.setPhoto(rs.getString("photo"));
				u.setLock(rs.getString("locku"));
				u.setTip(rs.getInt("tip"));

				users.add(u);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return users;
	}

	public int totalPage(UserInfo user) {
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		con = JdbcUtil.getConnection();

		int total = 0;

		StringBuilder sql = new StringBuilder(
				"select count(*) from user_info where power<>0");
		if (user.getUsername() != null && !user.getUsername().equals(""))
			sql.append(" and username like ?");

		if (user.getNickname() != null && !user.getNickname().equals(""))
			sql.append(" and nickname like ?");

		if (!user.getLock().equals("2"))
			sql.append(" and locku=?");

		sql.append(" and tip>=?");

		try {
			st = con.prepareStatement(sql.toString());

			int index = 1;
			if (user.getUsername() != null && !user.getUsername().equals("")) {

				st.setString(index++, "%" + user.getUsername() + "%");
			}
			if (user.getNickname() != null && !user.getNickname().equals("")) {

				st.setString(index++, "%" + user.getNickname() + "%");
			}
			if (!user.getLock().equals("2")) {

				st.setString(index++, user.getLock());
			}

			st.setInt(index++, user.getTip());

			rs = st.executeQuery();

			if (rs.next()) {
				total = rs.getInt(1);
				total = PageUtil.pages(total);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}
		return total;
	}

	public boolean lockUser(String username,String flag){
		Connection con = null;
		PreparedStatement st = null;
		boolean result = false;

		con = JdbcUtil.getConnection();
		try {
			st = con.prepareStatement("update user_info set locku=? where username=?");

			st.setString(1,flag);
			st.setString(2,username);

			int r = st.executeUpdate();
			if(r==1)
				result=true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}
		return result;
	}
	
	public boolean tip(String name){
		Connection con = null;
		PreparedStatement st = null;
		boolean result = false;

		con = JdbcUtil.getConnection();
		try {
			st = con.prepareStatement("update user_info set tip=tip+1 where username=?");

			st.setString(1,name);

			int r = st.executeUpdate();
			if(r==1)
				result=true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}
		return result;
	}
}
